import type { GlobalConfig } from 'payload/types'
import { contenutoFields } from '../collections/fields'
import { Globals } from '.'

export const Testi: GlobalConfig = {
  access: {
    read: () => true,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'Luoghi',
          fields: contenutoFields,
        },
        {
          name: 'Itinerari',
          fields: contenutoFields,
        },
        {
          name: 'Residenze',
          fields: contenutoFields,
        },
        {
          name: 'Stakeholders',
          fields: contenutoFields,
        },
        {
          name: 'Articoli',
          fields: contenutoFields,
        },
        {
          name: 'Programma culturale',
          fields: contenutoFields,
        },
      ],
    },
  ],
  slug: Globals.Testi,
}
