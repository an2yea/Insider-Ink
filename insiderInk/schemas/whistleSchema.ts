import { Hash, Schema, Text } from "@truenetworkio/sdk"

export const whistleSchema = Schema.create({
    title: Text,
    content: Text,
})