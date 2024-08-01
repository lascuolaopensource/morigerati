import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Payload } from 'payload'

export async function loadDb(): Promise<Payload> {
  const payload: Payload = await getPayloadHMR({ config })
  return payload
}
