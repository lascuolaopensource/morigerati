import { GenerateTitle, GenerateURL } from 'node_modules/@payloadcms/plugin-seo/dist/types'
import { Plugin } from 'payload'
import { seoPlugin as _seoPlugin } from '@payloadcms/plugin-seo'
import { Collections } from '@/db/collections'
import { Globals } from '@/db/globals'
import { getServerSideURL } from '@/modules/utils/getURL'
import { Entity } from '@/modules/types'
import { generateBaseTitle } from './generateBaseTitle'

//

const generateTitle: GenerateTitle<Partial<Entity>> = ({ doc }) => {
  let title: string | undefined
  if ('nome' in doc) {
    title = doc.nome
  } else if ('titolo' in doc) {
    title = doc.titolo
  }
  return generateBaseTitle(title)
}

// TODO - Improve this function
const generateURL: GenerateURL<Entity> = ({ doc, globalSlug, collectionSlug }) => {
  const url = getServerSideURL()
  let path = ''

  if (globalSlug) {
    path = globalSlug
  } else if (collectionSlug) {
    path = collectionSlug
  }

  if ('slug' in doc && doc.slug) {
    path += '/' + doc.slug
  }

  return `${url}/${path}`
}

export const seoPlugin: Plugin = _seoPlugin({
  generateTitle,
  generateURL,
  collections: [
    Collections.Luoghi,
    Collections.Persone,
    Collections.Itinerari,
    Collections.Residenze,
    Collections.Articoli,
  ],
  globals: [Globals.Home, Globals.ChiSiamo, Globals.MobilitaSostenibile],
  uploadsCollection: Collections.Media,
  tabbedUI: true,
})
