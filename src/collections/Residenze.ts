import { CollectionConfig } from 'payload/types';

export const Residenze: CollectionConfig = {
  slug: 'residenze',
  labels: {
    singular: 'Residenza',
    plural: 'Residenze',
  },
  admin: {
    useAsTitle: 'Nome',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Info',
          fields: [
            {
              name: 'Nome',
              type: 'text',
              required: true,
            },
            {
              name: 'abstract',
              type: 'richText',
            },
            {
              name: 'programma',
              type: 'richText',
            },
            {
              name: 'tutore-ed-esperti',
              type: 'array',
              fields: [
                {
                  name: 'nome',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'data-inizio',
                  type: 'date',
                },
                {
                  name: 'data-fine',
                  type: 'date',
                },
              ],
            },
          ],
        },
        {
          label: 'Call',
          fields: [
            {
              name: 'figure-richieste',
              type: 'array',
              fields: [
                {
                  name: 'figura',
                  type: 'text',
                },
                {
                  name: 'descrizione-figura',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'link-iscrizione',
              type: 'text',
            },
            {
              name: 'deadline',
              type: 'date',
            },
            {
              name: 'media',
              type: 'relationship',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Processo',
          fields: [
            {
              name: 'descrizione-processo',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Output',
          fields: [
            {
              name: 'descrizione-output',
              type: 'richText',
            },
            {
              name: 'link-esterni',
              type: 'array',
              fields: [
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'documenti',
              type: 'array',
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Residenze;
