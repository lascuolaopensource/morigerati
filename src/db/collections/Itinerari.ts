import type { CollectionConfig } from 'payload'
import * as F from '@/db/fields'
import { Collections } from '.'
import {
  lexicalEditor,
  BoldFeature,
  InlineToolbarFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

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
            F.title('Generale'),
            F.nome,
            {
              ...F.tracciati,
              name: 'tracciato_gpx',
              label: 'Tracciato GPX',
            },

            F.divider,

            F.title('Informazioni tecniche'),
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
                  label: 'Durata (ore)',
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
                      label: 'Itinerario ad anello',
                      value: 'Itinerario ad anello',
                    },
                    {
                      label: 'Andata e ritorno',
                      value: 'Andata e ritorno',
                    },
                  ],
                },
                {
                  name: 'difficolta',
                  label: 'Difficoltà',
                  type: 'select',
                  admin: {
                    isClearable: true,
                  },
                  options: [
                    {
                      label: 'T - Turistico',
                      value: 'T - Turistico',
                    },
                    {
                      label: 'E - Escursionistico',
                      value: 'E - Escursionistico',
                    },
                    {
                      label: 'EE - Escursionisti Esperti',
                      value: 'EE - Escursionisti Esperti',
                    },
                  ],
                },
              ],
            },

            F.divider,

            {
              name: 'servizi',
              type: 'array',
              fields: [
                F.linkConNome,
                {
                  //da sistemare
                  name: 'testo',
                  type: 'richText',
                  label: 'Testo',
                  localized: true,
                  editor: lexicalEditor({
                    features: () => [InlineToolbarFeature(), ParagraphFeature(), BoldFeature()],
                  }),
                },
              ],
            },

            F.divider,

            F.title('Contenuti collegati'),
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
              fields: [
                { ...F.posizione, required: true },
                { ...F.media, required: true },
              ],
            },
          ],
        },

        F.tabContenuto,
      ],
    },
  ],
}

export default Itinerari
