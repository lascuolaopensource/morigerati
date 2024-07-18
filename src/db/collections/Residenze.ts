import { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'

export const Residenze: CollectionConfig = {
  slug: Collections.Residenze,
  labels: {
    singular: 'Residenza',
    plural: 'Residenze',
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
            F.header('Informazioni generali'),
            F.nome,
            {
              type: 'row',
              fields: [
                {
                  name: 'data_inizio',
                  label: 'Data inizio',
                  type: 'date',
                },
                {
                  name: 'data_fine',
                  label: 'Data fine',
                  type: 'date',
                },
              ],
            },
            F.divider,
            {
              name: 'esperti',
              label: 'Tutor ed esperti',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'nome',
                      type: 'text',
                    },
                    {
                      name: 'foto',
                      type: 'upload',
                      relationTo: Collections.Media,
                    },
                  ],
                },
                {
                  name: 'Bio',
                  type: 'richText',
                  label: 'Biografia',
                },
                {
                  name: 'progetti',
                  type: 'array',
                  fields: [F.linkConNome],
                },
                {
                  name: 'organizzazioni',
                  type: 'array',
                  fields: [F.linkConNome],
                },
              ],
            },
            F.divider,
            F.header('Testi'),
            F.divider,
            {
              name: 'abstract',
              type: 'richText',
            },
            F.divider,
            {
              name: 'programma',
              type: 'richText',
            },
            F.divider,
            {
              name: 'info_logistiche',
              type: 'richText',
              label: 'Informazioni logistiche',
            },
          ],
        },
        {
          label: 'Call',
          fields: [
            F.header('Informazioni generali'),
            {
              type: 'row',
              fields: [
                {
                  name: 'deadline',
                  type: 'date',
                },
                {
                  name: 'link_iscrizione',
                  label: 'Link iscrizione',
                  type: 'text',
                },
              ],
            },
            F.divider,
            F.header('Immagini e media'),
            {
              ...F.media,
              name: 'call_media',
              label: 'Media',
            },
            F.divider,
            F.header('Testo'),
            {
              name: 'figure_richieste',
              label: 'Figure richieste',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Processo',
          fields: [
            {
              type: 'group',
              name: 'processo',
              fields: [F.divider, ...F.contenutoFields],
            },
          ],
        },
        {
          name: 'Output',
          fields: [
            {
              type: 'group',
              name: 'output',
              fields: [F.divider, ...F.contenutoFields],
            },
          ],
        },
      ],
    },
  ],
}
