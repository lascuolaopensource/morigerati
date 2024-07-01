import type { GlobalConfig } from 'payload/types'


export const G_residenze: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
   
        {
          name: 'Testo',
          type:'richText',
        },
      ],

  slug: 'Residenze',
}