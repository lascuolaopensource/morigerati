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
      type: 'text',
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
      name: 'Tipo',
      type: 'text',
    },
    {
      name: 'URL',
      type: 'text',
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
