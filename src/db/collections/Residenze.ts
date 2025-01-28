import { CollectionConfig } from 'payload'
import { Collections } from '.'
import * as F from '@/fields'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields'

export const Residenze: CollectionConfig<'residenze'> = {
  slug: 'residenze',
  labels: {
    singular: 'Residenza',
    plural: 'Residenze',
  },
  admin: {
    defaultColumns: ['nome', 'abstract'],
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

            F.divider('divider-1'),
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
            F.divider('divider-2'),
            {
              name: 'indirizzo',
              label: 'Indirizzo / luogo',
              type: 'text',
            },
            F.divider('divider-3'),
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
            F.divider('divider-4'),

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
        {
          label: 'Link',
          fields: [...slugField('nome')],
        },
      ],
    },
  ],
}
