// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Luoghi, Users, Media, Articoli, Itinerari, Stakeholders, Residenze],
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
  ],
})
