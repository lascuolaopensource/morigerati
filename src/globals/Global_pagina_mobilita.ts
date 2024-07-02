import type { GlobalConfig } from 'payload/types'
import { contenutoFields } from '../collections/fields'
import { Globals } from '.'

export const G_mobilita: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: contenutoFields,
  slug: Globals.Pagina_mobilita,
}
