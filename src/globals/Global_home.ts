import type { GlobalConfig } from 'payload/types'


export const G_Home: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
   
        {
          name: 'Landing banner',
          type:'text',
        },
      ],


  slug: 'Home',
}