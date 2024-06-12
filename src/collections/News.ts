import type { CollectionConfig } from 'payload/types';

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
      name: 'Contenuto',
      type: 'textarea',
    },
    {
      name: 'Data_Pubblicazione',
      type: 'date',
    },
    {
        name: 'media',
        type: 'relationship',
        relationTo: 'media',
        hasMany: true,
    },
  ],
};

export default News;
