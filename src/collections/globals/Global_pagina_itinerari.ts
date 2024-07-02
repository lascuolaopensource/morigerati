import type { GlobalConfig } from 'payload/types'


export const G_itinerari: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
   
        {
          name: 'Testo',
          type:'richText',
        },
      ],

  slug: 'Itinerari',
}