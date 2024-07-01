import type { GlobalConfig } from 'payload/types'
import { Collections } from '../collections'
import { Globals } from '.'



export const G_chi_siamo: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
   
        {
          name: 'Testo in alto',
          type:'richText',
        },
        {
          name: 'Media',
          label: 'Media',
          type: 'array',
              fields: [
                {
          name: 'foto',
          type: 'upload',
          relationTo: Collections.Media,
              }]
        },
        {
          name: 'Testo in basso',
          type:'richText',
        },
      ],


  slug: Globals.Pagina_chi_siamo,
}