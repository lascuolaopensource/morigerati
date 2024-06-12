import type { CollectionConfig } from 'payload/types';

export const Attivita: CollectionConfig = {
  slug: 'attivita',
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
      name: 'Organizzatori',
      type: 'array',
      fields: [
        {
          name: 'Nome',
          type: 'text',
        },
        {
          name: 'Ruolo',
          type: 'text',
        },
      ],
    },
    {
      name: 'Luogo',
      type: 'relationship',
      relationTo: 'luoghi',
    },
    {
      name: 'Data_Inizio',
      type: 'date',
    },
    {
      name: 'Data_Fine',
      type: 'date',
    },
    {
      name: 'Tipo', //capire
      type: 'text',
    },
    {
      name: 'Prenotazione_Necessaria',
      type: 'checkbox',
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
      name: 'Output_Documenti',
      type: 'relationship',
      relationTo: 'archivio-documenti',
    },
  ],
};

