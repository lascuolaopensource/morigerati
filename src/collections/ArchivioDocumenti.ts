import type { CollectionConfig } from 'payload/types';

export const ArchivioDocumenti: CollectionConfig = {
  slug: 'archivio-documenti',
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
      name: 'Autore',
      type: 'array',
      fields: [
        {
          name: 'nome',
          type: 'text',
        },
        {
          name: 'cognome',
          type: 'text',
        },
      ],
    },
    {
      name: 'Descrizione',
      type: 'textarea',
    },
    {
      name: 'Data',
      type: 'date',
    },
    {
      name: 'Tipo', //capire 
      type: 'text',
    }, 
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
        name: 'media',
        type: 'relationship',
        relationTo: 'media',
        hasMany: true,
    },
  ],
};

export default ArchivioDocumenti;
