import type { CollectionConfig } from 'payload/types'
import { Collections } from '.'
import * as F from './fields'

export const Luoghi: CollectionConfig = {
  slug: Collections.Luoghi,
  labels: { singular: 'Luogo', plural: 'Luoghi' },
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
            F.posizione,
            {
              name: 'servizi',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [F.nome, F.link],
                },
                F.descrizione,
              ],
            },
            F.contatti,
            {
              name: 'orari',
              type: 'richText',
            },
          ],
        },
        F.tabContenuto,
      ],
    },
  ],
}
