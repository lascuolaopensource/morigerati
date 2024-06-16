import type { CollectionConfig } from 'payload/types'
import { Collections } from '.'
import * as F from './fields'

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
    {
      name: 'titolo',
      type: 'text',
      required: true,
    },
    {
      name: 'data_pubblicazione',
      type: 'date',
    },
    F.media,
    {
      name: 'testo',
      type: 'richText',
    },
  ],
}
