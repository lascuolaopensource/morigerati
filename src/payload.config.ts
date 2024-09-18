// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './db/collections/Users'
import { Media } from './db/collections/Media'
import { Articoli } from './db/collections/Articoli'  
import { Itinerari } from './db/collections/Itinerari'
import { Luoghi } from './db/collections/Luoghi'
import { Residenze } from './db/collections/Residenze'
import { Stakeholders } from './db/collections/Stakeholders'

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
  collections: [Users, Media, Luoghi, Itinerari, Residenze, Stakeholders, Articoli],
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
    // storage-adapter-placeholder
  ]}
)
