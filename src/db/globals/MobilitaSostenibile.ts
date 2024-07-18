import type { GlobalConfig } from 'payload'
import { contenutoFields } from '@/db/fields'
import { Globals } from '.'

export const MobilitaSostenibile: GlobalConfig = {
  slug: Globals.MobilitaSostenibile,
  label: 'Mobilità sostenibile',
  access: {
    read: () => true,
  },
  fields: contenutoFields,
}
