import type { GlobalConfig } from 'payload'
import * as F from '@/db/fields'
import { Globals } from '.'

export const MobilitaSostenibile: GlobalConfig = {
  slug: Globals.MobilitaSostenibile,
  label: 'Mobilità sostenibile',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'copertina',
      type: 'upload',
      label: 'Immagine di copertina',
      relationTo: 'media',
    },
    {
      name: 'testo',
      type: 'richText',
      label: 'Testo',
      localized: true,
    },
    F.divider('divider-1'),
    F.galleria,
  ],
}
