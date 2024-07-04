import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Payload } from 'payload'

type Collections = Parameters<Payload['find']>[0]
type Globals = Parameters<Payload['findGlobal']>[0]

export async function findCollection(options: Collections) {
  try {
    console.log('Finding collection with options:', options)
    const payload: Payload = await getPayloadHMR({ config })
    const result = await payload.find(options)
    console.log('Collection result:', result)
    return result
  } catch (error) {
    console.error('Error in findCollection:', error)
    throw error
  }
}

export async function findGlobals(options: Globals) {
  try {
    console.log('Finding globals with options:', options)
    const payload: Payload = await getPayloadHMR({ config })
    const result = await payload.findGlobal(options)
    console.log('Globals result:', result)
    return result
  } catch (error) {
    console.error('Error in findGlobals:', error)
    throw error
  }
}