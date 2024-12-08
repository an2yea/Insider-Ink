import { Schema, U16 } from "@truenetworkio/sdk"

export const whistleSchema = Schema.create({
    sentimentScore: U16,
    currentReputation: U16,
})
