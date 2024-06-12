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
      type: 'textarea',
      required: true,
    },
    {
      name: 'attivita_servizi',
      type: 'textarea',
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'collegamento_itinerari',
      type: 'relationship',
      relationTo: 'itinerari',
      hasMany: true,
    },
    {
      name: 'info_contatti',
      type: 'textarea',
    },
  ],
};

export default Luoghi;
