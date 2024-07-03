import { buildConfig } from 'payload/config';
import { fileURLToPath } from 'url';
import path from 'path';
import sharp from 'sharp';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

// Collections
import { Stakeholders } from './collections/Stakeholders';
import { Residenze } from './collections/Residenze';
import { Itinerari } from './collections/Itinerari';
import { Luoghi } from './collections/Luoghi';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Articoli } from './collections/Articoli';

// Globals
import { Home } from '@/collections/globals/Home';
import { Chi_Siamo } from '@/collections/globals/Chi_Siamo';
import { Mobilita } from '@/collections/globals/Mobilita';
import { Testi } from '@/collections/globals/Testi';
import { Info } from '@/collections/globals/Info';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Stakeholders,
    Itinerari,
    Luoghi,
    Residenze,
    Articoli,
    Media,
    Users,
  ],
  globals: [
    Home,
    Chi_Siamo,
    Mobilita,
    Testi,
    Info
  ],
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
});
