import type { CollectionConfig } from 'payload'
import * as F from '@/fields'
import { Collections } from '.'
import { slugField } from '@/fields'

export const Stakeholders: CollectionConfig<'stakeholders'> = {
  slug: 'stakeholders',
  labels: {
    singular: 'Stakeholder',
    plural: 'Stakeholders',
  },
  admin: {
    defaultColumns: ['nome', 'testo'],
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
            F.plainText('indirizzo'),
            F.divider('divider-1'),
            F.contatti,
          ],
        },
        F.tabContenuto,
        {
          label: 'Link',
          fields: [...slugField('nome')],
        },
      ],
    },
  ],
}
