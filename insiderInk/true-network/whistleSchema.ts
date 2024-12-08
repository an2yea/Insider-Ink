import { Schema, I16 } from "@truenetworkio/sdk"

export const whistleSchema = Schema.create({
    sentimentScore: I16,
    currentReputation: I16,
})
