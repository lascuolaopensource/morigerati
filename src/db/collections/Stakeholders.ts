import type { CollectionConfig } from 'payload'
import * as F from '@/fields'
import { Collections } from '.'
import { slugField } from '@/fields'
import { formatSlug } from '@/fields/slug/formatSlug'

export const Stakeholders: CollectionConfig<'stakeholders'> = {
  slug: 'stakeholders',
  labels: {
    singular: 'Persona',
    plural: 'Persone',
  },
  admin: {
    defaultColumns: ['nome', 'testo'],
    useAsTitle: F.nome.name,
  },

  hooks: {
    beforeChange: [
      async ({ req, data, originalDoc, operation }) => {
        // For localized fields, ensure the slug is properly updated for each locale
        if (data.nome && typeof data.nome === 'object') {
          // Initialize slug object if it doesn't exist
          if (!data.slug) {
            data.slug = {}
          } else if (typeof data.slug === 'string') {
            // If slug exists as a string, convert to object
            const defaultSlug = data.slug
            data.slug = { [req.locale || 'it']: defaultSlug }
          }

          // Generate slug for each locale in nome
          Object.entries(data.nome).forEach(([locale, value]) => {
            if (typeof value === 'string' && value.trim()) {
              // Only update if nome is not empty
              data.slug[locale] = formatSlug(value)
            }
          })
        }

        return data
      },
    ],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Dati',
          fields: [
            F.title('Info generali'),
            {
              type: 'row',
              fields: [
                F.nome,
                {
                  name: 'tipologia',
                  type: 'select',
                  options: ['Azienda', 'Ristoratori', 'etc'],
                },
              ],
            },
            F.posizione,
            {
              name: 'indirizzo',
              type: 'text',
            },
            F.divider('divider-1'),
            F.contatti,
          ],
        },
        F.tabContenuto,
        {
          label: 'Link',
          fields: [...slugField('nome', { localized: true })],
        },
      ],
    },
  ],
}
