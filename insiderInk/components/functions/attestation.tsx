import { whistleSchema } from '@/schemas/whistleSchema'
import { config, getTrueNetworkInstance } from '@/true-network/true.config'

interface TrueNetworkResults {
    blockHash: string
    reputationScore: number
}

export default async function createWhistle(walletAddress: string, title: string, content: string, sentimentScore: number, currentReputation: number): Promise<TrueNetworkResults> {
    try {
        const api = await getTrueNetworkInstance()

    const output = await whistleSchema.attest(api, walletAddress, {
        sentimentScore: sentimentScore,
        currentReputation: currentReputation,
    })

    const reputationScore = await api.getReputationScore(config.algorithm?.id ?? 0, walletAddress)

    console.log('tx hash for attestation`, output')
    console.log('reputation score', reputationScore)

    await api.network.disconnect()

    const response: TrueNetworkResults = {
        blockHash: output ?? '',
            reputationScore: reputationScore ?? 0
        }

        return response
    } catch (error) {
        console.error('Error creating whistle', error)
        throw error
    }
}


export async function getAttestations(walletAddress: string) {
    const api = await getTrueNetworkInstance()
    // const attestations = await api.getAttestation(walletAddress, whistleSchema)
    const attestations = await whistleSchema.getAttestations(api, walletAddress)
    console.log("TBD: Add attestations when SDK available", walletAddress)
    return attestations
}