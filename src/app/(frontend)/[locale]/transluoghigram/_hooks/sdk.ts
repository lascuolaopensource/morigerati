import { PayloadSDK } from '@payloadcms/sdk'

import type { Config } from '@/payload-types'

//

export const sdk = new PayloadSDK<Config>({
	baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
})
