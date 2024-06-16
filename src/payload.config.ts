// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Stakeholders } from './collections/Stakeholders'
import { Residenze } from './collections/Residenze'
import { Itinerari } from './collections/Itinerari'
import { Documenti } from './collections/Documenti'
// import { Attivita } from './collections/Attivita'
import { Luoghi } from './collections/Luoghi'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Call } from './collections/Call'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Stakeholders, Itinerari, Documenti, Luoghi, News, Residenze],
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
