import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'
import {
  lexicalEditor,
  BoldFeature,
  InlineToolbarFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

export const Luoghi: CollectionConfig = {
  slug: Collections.Luoghi,

  labels: {
    singular: 'Luogo',
    plural: 'Luoghi',
  },

  admin: {
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
            F.divider,
            {
              name: 'Itinerari in cui si trovai il luogo',
              type: 'relationship',
              relationTo: Collections.Itinerari,
              hasMany: true,
            },
            F.divider,
            F.servizi,
            F.divider,
            F.contatti,
            F.divider,
            F.title('Orari'),
            {
              name: 'orari',
              type: 'richText',
              label: 'Orari di attività e date di chiusura',
              localized: true,
              editor: lexicalEditor({
                features: () => [InlineToolbarFeature(), ParagraphFeature(), BoldFeature()],
              }),
            },
          ],
        },
        F.tabContenuto,
      ],
    },
  ],
}


