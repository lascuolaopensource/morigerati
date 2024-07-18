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
    F.plainTextRequired('subtitle'),
    F.plainTextRequired('via_line_1'),
    F.plainTextRequired('civico_e_cap'),
    F.plainTextRequired('citta'),
    F.plainTextRequired('mail'),
    F.plainTextRequired('orario_1'),
    F.plainTextRequired('orario_2'),
    F.plainTextRequired('orario_3'),
    F.plainTextRequired('link_instagram'),
    F.plainTextRequired('link_youtube'),
  ],
}
