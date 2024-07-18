import React from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'
import { Payload } from 'payload'

type CollectionOptions = Parameters<Payload['find']>[0]
type GlobalOptions = Parameters<Payload['findGlobal']>[0]

type PayloadDataProps = {
  collection?: CollectionOptions
  global?: GlobalOptions
}

function withPayloadData<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: PayloadDataProps,
) {
  return async function WithPayloadData(props: P) {
    try {
      let data
      if (options.collection) {
        data = await findCollection(options.collection)
      } else if (options.global) {
        data = await findGlobals(options.global)
      }
      return <WrappedComponent {...props} payloadData={data} />
    } catch (error) {
      console.error('Error fetching data:', error)
      return <div>Error loading data. Please try again later.</div>
    }
  }
}

export default withPayloadData
