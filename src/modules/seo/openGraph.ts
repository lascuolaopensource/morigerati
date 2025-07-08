import type { Metadata } from 'next'
import { getServerSideURL } from '#/utils/getURL'
import { appConfig } from '@/app-config'

//

type OpenGraph = NonNullable<Metadata['openGraph']>

const defaultOpenGraph: OpenGraph = {
  type: 'website',
  description: appConfig.description,
  images: [
    {
      url: `${getServerSideURL()}/${appConfig.defaultOGImage}`,
    },
  ],
  siteName: appConfig.fullName,
  title: appConfig.fullName,
}

export function mergeOpenGraph(og?: Metadata['openGraph']): OpenGraph {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
