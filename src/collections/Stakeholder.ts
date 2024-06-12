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
      type: 'textarea',
    },
    {
      name: 'Tipologia',
      type: 'select',
      options: [
        'Azienda',
        'Ristoratori',
        'Altro',
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
  ],
};

export default Stakeholder;
