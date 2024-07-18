import type { CollectionConfig } from 'payload'
import * as F from '@/db/fields'
import { Collections } from '.'

export const Itinerari: CollectionConfig = {
  slug: Collections.Itinerari,
  labels: {
    singular: 'Itinerario',
    plural: 'Itinerari',
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
            F.header('Generale'),
            F.nome,
            {
              name: 'tracciato_gpx',
              label: 'Tracciato GPX',
              type: 'upload',
              relationTo: Collections.Media,
            },
            F.divider,
            F.header('Informazioni tecniche'),
            {
              type: 'row',
              fields: [
                {
                  name: 'lunghezza',
                  label: 'Lunghezza itinerario (metri)',
                  type: 'number',
                },
                {
                  name: 'tempo',
                  label: 'Durata (minuti)',
                  type: 'number',
                },
                {
                  name: 'dislivello',
                  label: 'Dislivello (metri)',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'tipo',
                  type: 'select',
                  hasMany: true,
                  admin: {
                    isClearable: true,
                    isSortable: true,
                  },
                  options: [
                    {
                      label: 'tipo-0',
                      value: 'tipo-0',
                    },
                    {
                      label: 'tipo-1',
                      value: 'tipo-1',
                    },
                    {
                      label: 'tipo-2',
                      value: 'tipo-2',
                    },
                  ],
                },
                {
                  name: 'difficolta',
                  label: 'Difficoltà',
                  type: 'select',
                  admin: {
                    isClearable: true,
                    isSortable: true,
                  },
                  options: [
                    {
                      label: 'facile',
                      value: 'facile',
                    },
                    {
                      label: 'media',
                      value: 'media',
                    },
                    {
                      label: 'difficile',
                      value: 'difficile',
                    },
                  ],
                },
              ],
            },
            F.divider,
            F.servizi_con_link,
            F.divider,
            F.header('Contenuti collegati'),
            {
              name: 'luoghi',
              type: 'relationship',
              relationTo: Collections.Luoghi,
              hasMany: true,
            },
            {
              name: 'stakeholders',
              type: 'relationship',
              relationTo: Collections.Stakeholders,
              hasMany: true,
            },
            F.divider,
            {
              name: 'media_geolocalizzati',
              label: 'Media geolocalizzati',
              type: 'array',
              fields: [F.posizione, F.media],
            },
          ],
        },
        F.tabContenuto,
      ],
    },
  ],
}

export default Itinerari
