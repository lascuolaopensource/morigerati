import type { GlobalConfig } from 'payload'
import * as F from '@/db/fields'
import { Globals } from '.'

export const Home: GlobalConfig = {
  slug: Globals.Home,
  access: {
    read: () => true,
  },
  fields: [
    F.title('Landing'),
    {
      ...F.plainText('statement'),
      required: true,
    },
    {
      ...F.media,
      name: 'cover',
    },

    ...F.titoloTesto('intro'),
    ...F.titoloTesto('itinerari'),
    ...F.titoloTesto('luoghi'),
    ...F.titoloTesto('residenze'),
  ],
}
