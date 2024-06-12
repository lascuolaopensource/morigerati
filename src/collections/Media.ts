import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'Keywords',
      type: 'text',
    },
    {
      name: 'Tipologia',
      type: 'text',
    },
    {
      name: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'Data_Produzione',
      type: 'date',
    },
    {
      name: 'URL_Esterno',
      type: 'text',
    },
    {
      name: 'Credits',
      type: 'text',
    },
    {
      name: 'Descrizione',
      type: 'textarea',
    },
  ],
  upload: true,
};

export default Media;
