import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Payload } from 'payload'

//

type Collections = Parameters<Payload['find']>[0]
type Globals = Parameters<Payload['findGlobal']>[0]

export async function findCollection(options: Collections) {
  const payload: Payload = await getPayloadHMR({ config })
  const result = await payload.find(options)
  return result
}

export async function findGlobals(options: Globals) {
  const payload: Payload = await getPayloadHMR({ config })
  const result = await payload.findGlobal(options);
  return result
}
