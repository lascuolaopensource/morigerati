import type { GlobalConfig } from 'payload'
import { contenutoFields } from '@/db/fields'
import { Globals } from '.'

export const ChiSiamo: GlobalConfig = {
  slug: Globals.ChiSiamo,
  label: 'Chi siamo',
  access: {
    read: () => true,
  },
  fields: contenutoFields,
}
