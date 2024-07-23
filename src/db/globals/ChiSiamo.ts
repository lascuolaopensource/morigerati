import type { GlobalConfig } from 'payload'
import * as F from '@/db/fields'
import { Globals } from '.'

export const ChiSiamo: GlobalConfig = {
  slug: Globals.ChiSiamo,
  label: 'Chi siamo',
  access: {
    read: () => true,
  },
  fields: [
    ...F.titoloTesto('Corpo pagina "chi siamo"')
]
}
