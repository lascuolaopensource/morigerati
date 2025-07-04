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

import { s3Storage } from '@payloadcms/storage-s3'

import localization from '@/modules/i18n/localization'
import { it } from '@payloadcms/translations/languages/it'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from './db/collections/Users'
import { Media } from './db/collections/Media'
import { Articoli } from './db/collections/Articoli'
import { Itinerari } from './db/collections/Itinerari'
import { Luoghi } from './db/collections/Luoghi'
import { Residenze } from './db/collections/Residenze'
import { Persone } from './db/collections/Persone'
import { Tracciati } from './db/collections/Tracciati'
import { Account } from './db/collections/Account'

import { Home } from './db/globals/Home'
import { ChiSiamo } from './db/globals/ChiSiamo'
import { MobilitaSostenibile } from './db/globals/MobilitaSostenibile'
import { Footer } from './db/globals/Footer'
import { Testi } from './db/globals/Testi'

import { seoPlugin } from './modules/seo'
import { Post } from './db/collections/Post'
import { PostMedia } from './db/collections/PostMedia'

//

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',

  serverURL: process.env.NEXT_PUBLIC_DOMAIN,
  csrf: [],

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  i18n: {
    fallbackLanguage: localization.defaultLocale,
    supportedLanguages: { it, en },
  },
  localization,

  collections: [
    Users,
    Media,
    Luoghi,
    Itinerari,
    Residenze,
    Persone,
    Articoli,
    Tracciati,
    Account,
    Post,
    PostMedia,
  ],
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

  sharp,

  plugins: [
    seoPlugin,

    s3Storage({
      enabled: true,
      bucket: process.env.S3_BUCKET!,
      disableLocalStorage: true,
      collections: {
        [Media.slug]: {
          disableLocalStorage: true,
          prefix: 'media',
        },
        [Tracciati.slug]: {
          disableLocalStorage: true,
          prefix: 'tracciati',
        },
        [PostMedia.slug]: {
          disableLocalStorage: true,
          prefix: 'post-media',
        },
      },
      config: {
        endpoint: process.env.S3_ENDPOINT!,
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: true,
      },
    }),
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
