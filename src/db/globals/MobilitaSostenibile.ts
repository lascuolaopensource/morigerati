import type { GlobalConfig } from 'payload'
import * as F from '@/db/fields'
import { Globals } from '.'

export const MobilitaSostenibile: GlobalConfig = {
  slug: Globals.MobilitaSostenibile,
  label: 'Mobilità sostenibile',

  access: {
    read: () => true,
  },

  fields: [...F.contenutoFields],
}
