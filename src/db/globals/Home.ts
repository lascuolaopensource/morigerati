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
      required: true,
    },
    {
      ...F.media,
      name: 'cover',
      label: 'Immagine di copertina',
    },

    F.divider,
    ...F.titoloTesto('intro'),

    F.divider,
    ...F.titoloTesto('itinerari'),

    F.divider,
    ...F.titoloTesto('luoghi'),

    F.divider,
    ...F.titoloTesto('residenze'),
  ],
}
