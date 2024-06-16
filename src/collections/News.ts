import type { CollectionConfig } from 'payload/types'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'Titolo',
  },
  fields: [
    {
      name: 'Titolo',
      type: 'text',
      required: true,
    },
    {
      name: 'Programma',
      type: 'richText',
    },
    {
      name: 'Data-pubblicazione',
      type: 'date',
    },
    {
      name: 'Media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
