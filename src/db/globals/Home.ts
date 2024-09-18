import type { GlobalConfig } from 'payload'
import * as F from '@/db/fields'
import { Globals } from '.'

export const Home: GlobalConfig = {
  slug: Globals.Home,

  access: {
    read: () => true,
  },

  fields: [
    F.title('Copertina'),
    {
      ...F.plainText('statement'),
    },
    {
      ...F.media,
      name: 'cover',
      label: 'Immagine di copertina',
    },

    F.titleAndText('intro'),
    F.titleAndText('itinerari'),
    F.titleAndText('luoghi'),
    F.titleAndText('residenze'),
  ],
}
