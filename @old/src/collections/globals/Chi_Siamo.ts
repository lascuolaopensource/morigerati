import type { GlobalConfig } from 'payload'
import { contenutoFields } from '../../collections/fields'
import { Globals } from '.'



export const Chi_Siamo: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: contenutoFields,
  slug: Globals.Chi_Siamo,
}