import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'

export const Luoghi: CollectionConfig = {
  slug: Collections.Luoghi,
  labels: {
    singular: 'Luogo',
    plural: 'Luoghi',
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
            F.header('Info generali'),
            F.nome,
            F.posizione,
            F.divider,
            F.servizi,
            F.divider,
            F.contatti,
            F.divider,
            F.header('Orari'),
            {
              name: 'orari',
              type: 'richText',
              label: 'Orari di attività e date di chiusura',
            },
          ],
        },
        F.tabContenuto,
      ],
    },
  ],
}
