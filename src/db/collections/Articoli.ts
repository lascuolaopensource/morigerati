import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

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
    F.divider,
    ...F.contenutoFields,
  ],
}
