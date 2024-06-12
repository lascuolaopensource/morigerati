import type { CollectionConfig } from 'payload/types';

export const Itinerari: CollectionConfig = {
  slug: 'itinerari',
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
      name: 'Itinerario a piedi',
      type: 'textarea',
    },
    {
      name: 'Media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'Mappa',
      type: 'text',
    },
    {
      name: 'Link Downlaod Mappa',
      type: 'textarea',
    },
    {
      name: 'Prenotazione',
      type: 'array',
      fields: [
        {
          name: 'Tipologia',
          type: 'text',
        },
        {
          name: 'Codice_Identificativo',
          type: 'text',
        },
        {
          name: 'Tempi_Noleggio',
          type: 'text',
        },
        {
          name: 'Posizione',
          type: 'point',
        },
        {
          name: 'Location_Noleggio',
          type: 'text',
        },
        {
          name: 'Referente',
          type: 'text',
        },
        {
          name: 'Dettagli_Costo',
          type: 'textarea',
        },
        {
          name: 'Sostenibile',
          type: 'checkbox',
        },
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
  ],
};

