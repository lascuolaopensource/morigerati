import type { CollectionConfig } from 'payload/types'
import * as F from './fields'

export const Stakeholder: CollectionConfig = {
  slug: 'stakeholder',
  labels: {
    singular: 'Stakeholder',
    plural: 'Stakeholders',
  },
  admin: {
    useAsTitle: F.nome.name,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Dati',
          fields: [
            F.nome,
            {
              name: 'tipologia',
              type: 'select',
              options: ['Azienda', 'Ristoratori', 'etc'],
            },
            F.posizione,
            F.contatti,
          ],
        },
        F.tabContenuto,
      ],
    },
  ],
}

export default Stakeholder
