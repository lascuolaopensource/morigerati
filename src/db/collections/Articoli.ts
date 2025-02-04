import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/fields'

export const Articoli: CollectionConfig = {
  slug: Collections.Articoli,
  labels: {
    singular: 'Articolo',
    plural: 'Articoli',
  },
  admin: {
    useAsTitle: 'titolo',
    defaultColumns: ['titolo', 'testo', 'data_pubblicazione'],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenuto',
          fields: [
            F.title('Informazioni generali'),
            {
              ...F.plainText('titolo'),
              required: true,
            },
            F.gap(20, 'gap-1'),
            F.gap(20, 'gap-2'),
            {
              ...F.plainText('sottotitolo'),
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              maxRows: 3,
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

            ...F.contenutoFields,
          ],
        },
      ],
    },
  ],
}
