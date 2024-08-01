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
            F.title('Informazioni generali'),
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
                    F.nome,
                    {
                      ...F.media,
                      name: 'foto',
                    },
                  ],
                },
                {
                  ...F.testo,
                  name: 'bio',
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
            F.title('Testi'),
          ],
        },

        /* -- Testi -- */

        {
          label: 'Testi',
          fields: [
            {
              ...F.testo,
              name: 'abstract',
            },
            F.divider,
            {
              ...F.testo,
              name: 'programma',
            },
            F.divider,
            {
              ...F.testo,
              name: 'info_logistiche',
              label: 'Informazioni logistiche',
            },
          ],
        },

        /* -- Call -- */

        {
          label: 'Call',
          fields: [
            F.title('Informazioni generali'),
            {
              type: 'row',
              fields: [
                {
                  name: 'deadline_iscrizione',
                  label: 'Scadenza iscrizioni',
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

            F.title('Immagini e media'),
            {
              ...F.media,
              name: 'call_media',
              label: 'Media',
            },

            F.divider,

            F.title('Testo'),
            {
              ...F.testo,
              name: 'figure_richieste',
              label: 'Figure richieste',
            },
          ],
        },

        /* -- Processo -- */

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

        /* -- Output -- */

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
