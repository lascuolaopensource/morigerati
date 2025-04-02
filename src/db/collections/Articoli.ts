import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/fields'
import { slugField } from '@/fields'

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
  // @ts-ignore - La proprietà localized è supportata in Payload, ma potrebbe non essere riconosciuta dal tipo
  localized: true,

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
              localized: true,
            },
            F.gap(20, 'gap-1'),
            F.gap(20, 'gap-2'),
            {
              ...F.plainText('sottotitolo'),
              localized: true,
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              maxRows: 3,
              localized: true,
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'data_pubblicazione',
              label: 'Data pubblicazione',
              type: 'date',
            },

            ...F.contenutoFields.map((field: any) => {
              if (
                field.name === 'testo_html' ||
                field.name === 'testo' ||
                field.name === 'copertina' ||
                field.name === 'galleria'
              ) {
                return {
                  ...field,
                  localized: true,
                }
              }
              return field
            }),
          ],
        },
        {
          label: 'Link',
          fields: [...slugField('titolo', { localized: true })],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Assicura che lo slug rifletta la localizzazione corrente
        const locale = req.locale || 'it'

        // Ritorna i dati modificati
        return data
      },
    ],
  },
}
