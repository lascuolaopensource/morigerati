import type { CollectionConfig } from 'payload/types';

export const Stakeholder: CollectionConfig = {
  slug: 'stakeholder',
  admin: {
    useAsTitle: 'Nome',
  },
  fields: [
    {
      name: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'Descrizione',
      type: 'richText',
    },
    {
      name: 'Tipologia',
      type: 'select',
      options: [
        'Azienda',
        'Ristoratori',
        'etc',
      ],
    },
    {
      name: 'Itinerario',
      type: 'relationship',
      relationTo: 'itinerari',
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'contatti',
      type: 'array',
      fields: [
        {
          name: 'contatto',
          type: 'text',
        },
        {
          name: 'info-contatto',
          type: 'text',
        },
      ],
    },
    {
      name: 'Link Esterni',
      type: 'array',
      fields: [
        {
          name: 'Nome-link',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
};

export default Stakeholder;
