import { OauthClient } from "@zk-email/oauth-sdk";
import { Address, createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';


export default function ZkAuth() {
    return <div>ZkAuth</div>
}

export async function createOAuthInstance() {
    console.log("Creating OAuth instance")
    const publicClient = createPublicClient({
        chain: baseSepolia, // Chain ID
        transport: http("https://sepolia.base.org"), // Transport URL
    });
    const coreAddress: Address = '0x3C0bE6409F828c8e5810923381506e1A1e796c2F'; // Your core contract address. This prefilled default is already deployed on Base Sepolia
    const oauthAddress: Address = '0x8bFcBe6662e0410489d210416E35E9d6B62AF659'; // Your OAuth core contract address, deployed on Base Sepolia
    const relayerHost: string = "https://oauth-api.emailwallet.org"; // Your relayer host; this one is public and deployed on Base Sepolia

    const oauthClient = new OauthClient(publicClient, coreAddress, oauthAddress, relayerHost);
    console.log("OAuth instance created", oauthClient)
    return oauthClient
}

export async function zkSign(email: string, username:string): Promise<boolean> {
    try {
        console.log("Zk signing email", email, username)
        const oauthClient = await createOAuthInstance()
        const requestID = await oauthClient.setup(email, username, null, null )
        console.log("Request ID", requestID)
        const isActivated = await oauthClient.waitEpheAddrActivated(requestID)
        if (!isActivated) {
            throw new Error("Ephemeral address activation failed")
        }
        console.log("Ephemeral address activated")
        return true
    } catch (error) {
        console.error("Error in zkSign:", error)
        return false
    }
}