import config from '@payload-config'
import { getPayload } from 'payload'
import { Payload } from 'payload'

export async function loadDb(): Promise<Payload> {
  const payload: Payload = await getPayload({ config })
  return payload
}
