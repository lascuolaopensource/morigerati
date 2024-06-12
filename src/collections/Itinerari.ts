import type { CollectionConfig } from 'payload/types';

export const Itinerari: CollectionConfig = {
  slug: 'itinerari',
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
      name: 'descrizione_itinerario',
      type: 'textarea',
      required: true,
    },
    {
      name: 'info_itinerario',
      type: 'textarea',
      required: true,
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'mappa_gpx',
      type: 'text',
    },
    {
      name: 'traccia_gpx',
      type: 'text',
    },
    {
      name: 'link_prenotazione',
      type: 'text',
    },
  ],
};

export default Itinerari;
