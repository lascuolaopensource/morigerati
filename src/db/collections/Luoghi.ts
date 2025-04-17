import type { CollectionConfig } from 'payload'
import * as F from '@/fields'
import {
  lexicalEditor,
  BoldFeature,
  InlineToolbarFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields'
import { formatSlug } from '@/fields/slug/formatSlug'

export const Luoghi: CollectionConfig<'luoghi'> = {
  slug: 'luoghi',

  labels: {
    singular: 'Luogo',
    plural: 'Luoghi',
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
              const baseSlug = formatSlug(value)

              // Don't append itineraries to the slug - this would make URLs too long and complex
              // Instead, we'll handle displaying itineraries in the UI separately
              data.slug[locale] = baseSlug
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
            F.nome,
            {
              ...F.posizione,
            },

            {
              name: 'Itinerari_relation',
              label: 'Itinerari in cui si trova il luogo',
              type: 'relationship',
              relationTo: 'itinerari',
              hasMany: true,
            },
            F.divider('divider-1'),
            {
              ...F.servizi,
            },
            F.divider('divider-2'),
            {
              ...F.contatti,
            },
            F.divider('divider-3'),
            F.title('Orari'),
            {
              name: 'orari',
              type: 'richText',
              label: 'Orari di attività e date di chiusura',
              localized: true,
              editor: lexicalEditor({
                features: () => [
                  InlineToolbarFeature(),
                  ParagraphFeature(),
                  BoldFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
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
