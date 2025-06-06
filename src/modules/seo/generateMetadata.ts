import type { Metadata } from 'next'
import { getServerSideURL } from '@/modules/utils/getURL'
import { Entity } from '@/modules/types'
import { mergeOpenGraph } from './openGraph'
import { generateBaseTitle } from './generateBaseTitle'
import { Config, Media } from '@/payload-types'
import { appConfig } from '@/app-config'

//

export function generateMetadata(doc?: Partial<Entity>): Metadata {
  const title = generateBaseTitle(doc?.meta?.title)
  const ogImage = getImageURL(doc?.meta?.image)

  return {
    title,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      // TODO - Review url
      // url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
  }
}

function getImageURL(image?: Media | Config['db']['defaultIDType'] | null) {
  const serverUrl = getServerSideURL()
  let url = serverUrl + appConfig.defaultOGImage

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}
