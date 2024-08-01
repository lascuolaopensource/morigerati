// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Articoli } from '@/db/collections/Articoli'
import { Itinerari } from '@/db/collections/Itinerari'
import { Luoghi } from '@/db/collections/Luoghi'
import { Media } from '@/db/collections/Media'
import { Residenze } from '@/db/collections/Residenze'
import { Stakeholders } from '@/db/collections/Stakeholders'
import { Users } from '@/db/collections/Users'

import { Home } from '@/db/globals/Home'
import { ChiSiamo } from '@/db/globals/ChiSiamo'
import { MobilitaSostenibile } from '@/db/globals/MobilitaSostenibile'
import { Footer } from '@/db/globals/Footer'
import { Testi } from '@/db/globals/Testi'

import {
  lexicalEditor,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  HTMLConverterFeature
} from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Luoghi, Users, Media, Articoli, Itinerari, Stakeholders, Residenze],
  globals: [Home, ChiSiamo, MobilitaSostenibile, Footer, Testi],
  editor: lexicalEditor({
    features: ()  => [
      HeadingFeature(),
      ParagraphFeature(),
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
    // storage-adapter-placeholder
  ],
})
