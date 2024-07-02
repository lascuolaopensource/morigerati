// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

//Collections
import { Stakeholders } from './collections/Stakeholders'
import { Residenze } from './collections/Residenze'
import { Itinerari } from './collections/Itinerari'
import { Luoghi } from './collections/Luoghi'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articoli } from './collections/Articoli'

//Globals
import { Home } from './globals/Home'
import { Chi_Siamo } from './globals/Chi_Siamo'
import { Mobilita } from './globals/Mobilita'
import { Testi } from './globals/Testi'

import { G_luoghi } from './globals/Global_pagina_luoghi'
import { G_itinerari } from './globals/Global_pagina_itinerari'
import { G_stakeholders } from './globals/Global_pagina_stakeholders'
import { G_residenze } from './globals/Global_pagina_residenze'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Stakeholders, Itinerari, Luoghi, Residenze, Articoli, Media, Users],
  globals: [Home, Chi_Siamo, Mobilita, Testi],
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
