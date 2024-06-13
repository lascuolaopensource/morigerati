import type { CollectionConfig } from 'payload/types';

export const Luoghi: CollectionConfig = {
  slug: 'luoghi',
  admin: {
    useAsTitle: 'nome',
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
    },
    {
      name: 'descrizione',
      type: 'richText',
    },
    {
      name: 'Punti',
      type: 'array',
      fields: [
        {

      name: 'Punti',
      type: 'point',
      label: 'Location',
      },
    ]},
    {
      name: 'attività-servizi',
      type: 'array',
      fields: [
        {
          name: 'attivià',
          type: 'text',
        },
        {
          name: 'info-attività',
          type: 'text',
        },
      ],
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'info-contatti',
      type: 'array',
      fields: [
        {
          name: 'contatto',
          type: 'text',
        },
        {
          name: 'info',
          type: 'text',
        },
      ],
    },
  ],
};

export default Luoghi;
