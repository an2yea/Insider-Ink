import { whistleSchema } from '@/schemas/whistleSchema'
import { getTrueNetworkInstance } from '@/true-network/true.config'


export default async function createWhistle(walletAddress: string, title: string, content: string) {

    const api = await getTrueNetworkInstance()

    const output = await whistleSchema.attest(api, walletAddress, {
        title: title,
        content: content,
    })

    console.log(output)

    await api.network.disconnect()
}


export async function getAttestations(walletAddress: string) {
    const api = await getTrueNetworkInstance()
    // const attestations = await api.getAttestation(walletAddress, whistleSchema)
    console.log("TBD: Add attestations when SDK available")
    return []
}