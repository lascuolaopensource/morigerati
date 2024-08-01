import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'

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
      localized: true,
    },
    F.link,
    { ...F.testo, name: 'descrizione', label: 'Descrizione' },
  ],
}
