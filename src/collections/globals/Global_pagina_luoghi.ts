import type { GlobalConfig } from 'payload/types'
import { Globals } from '.'


export const G_luoghi: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
   
        {
          name: 'Testo',
          type:'richText',
        },
      ],

  slug: 'pagina_luoghi',
}