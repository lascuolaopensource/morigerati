import type { CollectionConfig } from 'payload/types'
import { Collections } from '.'
import * as F from './fields'

export const Media: CollectionConfig = {
  slug: Collections.Media,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: F.nome.name,
  },
  upload: true,
  fields: [
    F.nome,
    {
      name: 'alt',
      label: 'Testo alternativo',
      type: 'text',
      required: true,
    },
    F.link,
    F.descrizione,
  ],
}
