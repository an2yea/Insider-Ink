
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'
import { whistleSchema } from './whistleSchema'

// If you are not in a NodeJS environment, please comment the code following code:
import dotenv from 'dotenv'
dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'mGv3nxy2VTRtCw8THXcWaCSYoPJp24cXevDN299xQQyy8KC',
    secret: process.env.NEXT_PUBLIC_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'whistledown',
    hash: '0x80c4d7e1b1b2fd55ccf7980bb9d86031739249b8372a7d870c876c1a1afcb207'
  },
  algorithm: {
    id: 147,
    path: 'acm',
    schemas: [whistleSchema]
  },
}
  