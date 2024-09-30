import { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/db/fields'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

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
          label: 'Informazioni',
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

                F.divider,
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
                F.divider,
                {
                  name: 'indirizzo',
                  label: 'Indirizzo / luogo',
                  type: 'text',
                },
              ],
            },
          ],
        },

        /* -- Testi -- */

        {
          label: 'Testi',
          fields: [
            F.title('Testi'),
            {
              ...F.testo,
              name: 'abstract',
              label: 'Abstract',
            },
            lexicalHTML('abstract', { name: 'abstract_html' }),
            F.divider,

            {
              ...F.testo,
              name: 'descrizione',
              label: 'Descrizione',
            },
            lexicalHTML('info_logistiche', { name: 'info_html' }),
          ],
        },
        { label: 'Galleria', fields: [F.title('Galleria'), F.galleria] },
        /* -- Porgramma -- */
        { label: 'Programma', fields: [F.programmaArray] },
        /* -- Call -- */
        {
          label: 'Tutor ed esperti',
          fields: [
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
                F.plainText('biografia'),

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
          ],
        },
        /* -- Processo -- */

        /* -- Output -- */
      ],
    },
  ],
}
