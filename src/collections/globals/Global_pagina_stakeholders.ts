import type { GlobalConfig } from 'payload/types'


export const G_stakeholders: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
   
        {
          name: 'Testo',
          type:'richText',
        },
      ],

  slug: 'Stakeholders',
}