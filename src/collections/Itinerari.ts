import type { CollectionConfig } from 'payload/types';

export const Itinerari: CollectionConfig = {
  slug: 'itinerari',
  admin: {
    useAsTitle: 'nome',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Itinerario',
          fields: [
            {
              name: 'nome',
              type: 'text',
            },
            {
              name: 'descrizione-itinerario',
              type: 'richText',
            },
            {
              name: 'Luoghi',
              type: 'relationship',
              relationTo: 'luoghi',
              hasMany: true,
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
              {
                name: 'Luoghi',
                type: 'relationship',
                relationTo: 'luoghi',
                hasMany: true,
              },
            ]},
            {
              name: 'Media-Localizzati',
              type: 'array',
              fields: [
                {

              name: 'punto-media',
              type: 'point',
              label: 'Location',
              },
              {
                name: 'media',
                type: 'relationship',
                relationTo: 'media',
                hasMany: true,
              },
            ]},
            {
              name: 'mappa-gpx',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'link-prenotazione-guida',
              type: 'text',
            },
            {
              name: 'media',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Info',
          fields: [
            {
              name: 'info-itinerario',
              type: 'richText',
            },

            {
              type: 'row', 
              fields: [
              {
                name: 'lunghezza',
                type: 'text',
              },
              {
                name: 'tempo',
                type: 'text',
              },
              {
                name: 'dislivello',
                type: 'text',
              },
              {
                name: 'Tipo', 
                type: 'select', 
                hasMany: true,
                admin: {
                  isClearable: true,
                  isSortable: true, 
                },
                options: [
                  {
                    label: 'tipo-0',
                    value: 'tipo-0',
                  },
                  {
                    label: 'tipo-1',
                    value: 'tipo-1',
                  },
                  {
                    label: 'tipo-2',
                    value: 'tipo-2',
                  },
                ],
              },
              {
                name: 'Difficoltà', 
                type: 'select', 
                admin: {
                  isClearable: true,
                  isSortable: true, 
                },
                options: [
                  {
                    label: 'facile',
                    value: 'facile',
                  },
                  {
                    label: 'media',
                    value: 'media',
                  },
                  {
                    label: 'difficile',
                    value: 'difficile'
                  }
                ],
              },
            ],
            },{
              name: 'servizi-aggiuntivi-integrati',
              type: 'array',
              fields: [
                {
                  name: 'servizio',
                  type: 'text',
                },
                {
                  name: 'url-prenotazione',
                  type: 'text',
        
                },
              ],
            },
          ],
          
      },
      ],
      
    }, 
  ],
}

export default Itinerari;
