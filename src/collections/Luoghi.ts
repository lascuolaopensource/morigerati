import type { CollectionConfig } from 'payload/types';

export const Luoghi: CollectionConfig = {
  slug: 'luoghi',
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
      name: 'Tipo',
      type: 'text',
    },
    {
        name: 'media',
        type: 'relationship',
        relationTo: 'media',
        hasMany: true,
    },
    {
      name: 'Itinerario',
      type: 'relationship',
      relationTo: 'itinerari',
    },
    {
      name: 'Eventi',
      type: 'relationship',
      relationTo: 'attivita',
    },
  ],
};

