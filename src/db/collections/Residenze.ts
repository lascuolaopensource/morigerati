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
          label: 'Generali',
          fields: [
            F.title('Informazioni generali'),
            F.nome,

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
            F.divider,
            {
              name: 'mostra_dettagli',
              type: 'checkbox',
              label: 'Mostra dettagli sulla pagina',
              defaultValue: false,
            },

            {
              name: 'mostra_pulsante_iscrizione',
              type: 'checkbox',
              label: 'Mostra pulsante iscrizione',
              defaultValue: false,
            },
            {
              name: 'passata_futura',
              label: 'Passata o futura',
              type: 'radio',
              options: [
                {
                  label: 'Passata',
                  value: 'passata',
                },
                {
                  label: 'Futura',
                  value: 'futura',
                },
              ],
              defaultValue: 'futura',
              admin: {
                layout: 'horizontal',
              },
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
            lexicalHTML('descrizione', { name: 'info_html' }),
          ],
        },

        { label: 'Media', fields: [F.title('Media'), F.media, F.galleria] },

        { label: 'Programma', fields: [F.programmaArray] },

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
      ],
    },
  ],
}
