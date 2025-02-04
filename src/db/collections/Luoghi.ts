import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/fields'
import {
  lexicalEditor,
  BoldFeature,
  InlineToolbarFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields'

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

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Dati',
          fields: [
            F.title('Info generali'),
            F.nome,
            F.posizione,

            {
              name: 'Itinerari_relation',
              label: 'Itinerari in cui si trova il luogo',
              type: 'relationship',
              relationTo: 'itinerari',
              hasMany: true,
            },
            F.divider('divider-1'),
            F.servizi,
            F.divider('divider-2'),
            F.contatti,
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
          fields: [...slugField('nome')],
        },
      ],
    },
  ],
}
