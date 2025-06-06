import type { Metadata } from 'next'
import { getServerSideURL } from '@/modules/utils/getURL'
import { Entity } from '@/modules/types'
import { mergeOpenGraph } from './openGraph'
import { generateBaseSEOTitle } from './utils'
import { Config, Media } from '@/payload-types'
import { appConfig } from '@/app-config'
import { Locale } from '@/modules/i18n'
import { getPageTitle } from '@/modules/utils/getPageTitle'

//

type GenerateMetadataArgs = {
  doc?: Partial<Entity>
  locale?: Locale
  title?: string
  description?: string
  pathname?: string
}

export function createMetadata(args: GenerateMetadataArgs = {}): Metadata {
  const { doc, locale, title: titleArg, description: descriptionArg } = args

  const pageTitle = doc ? getPageTitle(doc) : undefined
  const title = generateBaseSEOTitle(titleArg ?? doc?.meta?.title ?? pageTitle)

  const description = descriptionArg ?? doc?.meta?.description ?? undefined
  const ogImage = getImageURL(doc?.meta?.image)

  let url = ''
  if (locale) url += locale
  if (args.pathname) url += '/' + args.pathname

  return {
    metadataBase: new URL(getServerSideURL()),
    title,
    description,
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
      // TODO - Review url / Include Locale
      // url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      url,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage,
    },
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
