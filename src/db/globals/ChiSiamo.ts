import type { GlobalConfig } from 'payload'
import * as F from '@/fields'
import { Globals } from '.'
import { HeadingFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ChiSiamo: GlobalConfig = {
  slug: Globals.ChiSiamo,
  label: 'Chi siamo',

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
      name: 'testo_chi_siamo',
      type: 'richText',
      label: 'Testo "Chi siamo"',
      localized: true,
    },
    F.divider('divider-1'),
    F.galleria,
  ],
}
