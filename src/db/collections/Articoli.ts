import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'

export const Articoli: CollectionConfig = {
  slug: Collections.Articoli,
  labels: {
    singular: 'Articolo',
    plural: 'Articoli',
  },
  admin: {
    useAsTitle: 'titolo',
  },

  fields: [
    F.title('Informazioni generali'),
    {
      ...F.plainText('titolo'),
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'data_pubblicazione',
      label: 'Data pubblicazione',
      type: 'date',
    },
    F.divider,
    ...F.contenutoFields,
  ],
}
