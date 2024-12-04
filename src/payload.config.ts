// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Luoghi, Itinerari, Residenze, Stakeholders, Articoli, Tracciati],
  globals: [Home, ChiSiamo, MobilitaSostenibile, Footer, Testi],
  editor: lexicalEditor(),
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
      collections: ['Itinerari', 'Luoghi', 'Stakeholders', 'Residenze', 'Articoli'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Website.com — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt,
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
