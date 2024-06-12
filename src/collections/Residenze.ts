import type { CollectionConfig } from 'payload/types';

export const Residenze: CollectionConfig = {
  slug: 'residenze',
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
      name: 'descrizione_processo',
      type: 'textarea',
      required: true,
    },
    {
      name: 'descrizione_output',
      type: 'textarea',
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'link_esterni_doc_download',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
};

export default Residenze;
