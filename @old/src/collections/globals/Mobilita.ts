import type { GlobalConfig } from 'payload'
import { contenutoFields } from '../../collections/fields'
import { Globals } from '.'

export const Mobilita: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields:
     contenutoFields  ,
  slug: Globals.Mobilita,
}
