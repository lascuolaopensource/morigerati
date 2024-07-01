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
import { Luoghi } from './collections/Luoghi'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articoli } from './collections/Articoli'
import { G_Home } from './globals/Global_home'
import { G_mobilita } from './globals/Global_pagina_mobilita'
import { G_chi_siamo } from './globals/Global_chi_siamo'
import { G_luoghi } from './globals/Global_pagina_luoghi'
import { G_itinerari } from './globals/Global_pagina_itinerari'
import { G_stakeholders } from './globals/Global_pagina_stakeholders'
import { G_residenze } from './globals/Global_pagina_residenze'
// import { Attivita } from './collections/Attivita'
// import { Call } from './collections/Call'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Stakeholders, Itinerari, Luoghi, Residenze, Articoli, Media, Users],
  globals: [G_Home, G_mobilita, G_chi_siamo, G_luoghi, G_itinerari, G_stakeholders, G_residenze],
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
