// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  lexicalEditor,
  InlineToolbarFeature,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './db/collections/Users'
import { Media } from './db/collections/Media'
import { Articoli } from './db/collections/Articoli'
import { Itinerari } from './db/collections/Itinerari'
import { Luoghi } from './db/collections/Luoghi'
import { Residenze } from './db/collections/Residenze'
import { Stakeholders } from './db/collections/Stakeholders'
import { Tracciati } from './db/collections/Tracciati'

import { Home } from './db/globals/Home'
import { ChiSiamo } from './db/globals/ChiSiamo'
import { MobilitaSostenibile } from './db/globals/MobilitaSostenibile'
import { Footer } from './db/globals/Footer'
import { Testi } from './db/globals/Testi'
import { Collections } from './db/collections'
import { Globals } from './db/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    fallback: false,
  },
  collections: [Users, Media, Luoghi, Itinerari, Residenze, Stakeholders, Articoli, Tracciati],
  globals: [Home, ChiSiamo, MobilitaSostenibile, Footer, Testi],
  editor: lexicalEditor({
    features: () => [
      InlineToolbarFeature(),
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature(),
      HeadingFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: [
        Collections.Luoghi,
        Collections.Stakeholders,
        Collections.Itinerari,
        Collections.Residenze,
        Collections.Articoli,
      ],
      globals: [Globals.Home, Globals.ChiSiamo, Globals.MobilitaSostenibile],
      uploadsCollection: Collections.Media,
      generateTitle: ({ doc }) => {
        const title = doc?.nome || doc?.titolo || ''
        return title ? `${title} | Morigerati` : 'Morigerati'
      },
      generateDescription: ({ doc }) => {
        if (doc?.testo_html) {
          return doc.testo_html.replace(/<[^>]*>/g, '').substring(0, 155)
        }
        return ''
      },
      generateURL: ({ doc, collectionSlug, globalSlug }) => {
        if (globalSlug) {
          return `https://morigerati.it/${globalSlug === Globals.Home ? '' : globalSlug.replace('_', '-')}`
        }
        return `https://morigerati.it/${collectionSlug}/${doc?.slug || ''}`
      },
      tabbedUI: true,
    }),
    s3Storage({
      collections: {
        [Media.slug]: {
          disableLocalStorage: true,
        },
      },
      disableLocalStorage: true,
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT || '',
        region: process.env.S3_REGION || '',
      },
    }),
    // storage-adapter-placeholder
  ],
})
