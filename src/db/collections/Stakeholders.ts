import type { CollectionConfig } from 'payload'
import * as F from '@/db/fields'
import { Collections } from '.'

export const Stakeholders: CollectionConfig = {
  slug: Collections.Stakeholders,
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
            F.title('Info generali'),
            {
              type: 'row',
              fields: [
                F.nome,
                {
                  name: 'tipologia',
                  type: 'select',
                  options: ['Azienda', 'Ristoratori', 'etc'],
                },
              ],
            },
            F.posizione,
            F.divider,
            F.contatti,
            F.itinerari,
          ],
        },
        F.tabContenuto,
      ],
    },
  ],
}
