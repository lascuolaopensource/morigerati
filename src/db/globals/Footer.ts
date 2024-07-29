import type { GlobalConfig } from 'payload'
import { Globals } from '.'
import * as F from '@/db/fields'

export const Footer: GlobalConfig = {
  slug: Globals.Footer,
  access: {
    read: () => true,
  },
  fields: [
    F.plainTextRequired('title'),
    {
      name: 'testo_sinista',
      type: 'richText',
      label: 'testo sinistra',
    },
    {
      name: 'testo_destra',
      type: 'richText',
      label: 'testo destra',
    },
    F.socialLinksArray,

  ],
}
