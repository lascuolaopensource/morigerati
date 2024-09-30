import {
  ArrayField,
  Field,
  GroupField,
  PointField,
  RelationshipField,
  RichTextField,
  RowField,
  Tab,
  TextField,
  UIField,
} from 'payload'
import { Collections } from '@/db/collections'

import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

import { capitalizeFirstLetter } from '@/utils/strings'

export const divider: UIField = {
  name: 'divider',
  type: 'ui',
  admin: {
    components: {
      Field: '/db/fields/components/divider.tsx',
    },
  },
}

export function title(text: string): UIField {
  return {
    name: 'header',
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '/db/fields/components/header.tsx',
          clientProps: {
            content: text,
          },
        },
      },
    },
  }
}

export function gap(size: number): UIField {
  return {
    name: 'gap',
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '/db/fields/components/gap.tsx',
          clientProps: {
            size: size,
          },
        },
      },
    },
  }
}

//

export const nome: TextField = {
  name: 'nome',
  type: 'text',
  required: true,
  localized: true,
}

export const link: TextField = {
  name: 'link',
  type: 'text',
}

export const testo: RichTextField = {
  name: 'testo',
  label: 'Testo',
  type: 'richText',
  localized: true,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
  }),
}

export function plainText(name: string): TextField {
  return {
    name,
    type: 'text',
    localized: true,
  }
}

export function plainTextRequired(name: string): TextField {
  return {
    ...plainText(name),
    required: true,
  }
}

export function richText(name: string): RichTextField {
  return {
    name,
    type: 'richText',
    localized: true,
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
    }),
  }
}

export const posizione: PointField = {
  name: 'posizione',
  type: 'point',
}

export const linkConNome: RowField = {
  type: 'row',
  fields: [nome, { ...link, required: true }],
}

export const linkArray: ArrayField = {
  label: 'Link',
  name: 'links',
  type: 'array',
  fields: linkConNome.fields,
}

export const programmaArray: ArrayField = {
  label: 'Programma',
  name: 'programma',
  type: 'array',

  fields: [
    {
      name: 'programma',
      label: 'giorno / momento',
      type: 'text',
    },
    richText('testo'),
    lexicalHTML('testo', { name: 'testo_html' }),
  ],
}

export const contatti: ArrayField = {
  name: 'contatti',
  type: 'array',
  fields: [
    {
      type: 'row',
      fields: [nome, link],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'telefono',
          type: 'text',
        },
      ],
    },
  ],
}

export const media: RelationshipField = {
  name: 'copertina',
  label: 'copertina',
  type: 'relationship',
  relationTo: Collections.Media,
}

export const galleria: RelationshipField = {
  name: 'galleria',
  label: 'galleria',
  type: 'relationship',
  hasMany: true,
  relationTo: Collections.Media,
}

export const servizi: ArrayField = {
  name: 'servizi',
  type: 'array',
  fields: [nome, { ...testo, required: true }, lexicalHTML('testo', { name: 'testo_html' })],
}

export const contenutoFields: Field[] = [
  title('Immagini e media'),
  media,
  linkArray,
  galleria,
  divider,
  title('Contenuti testuali'),
  { ...testo, required: true },
  lexicalHTML('testo', { name: 'testo_html' }),
]

export const contenutoFieldsUnrequired: Field[] = [
  title('Immagini e media'),
  media,
  linkArray,
  galleria,
  divider,
  title('Contenuti testuali'),
  { ...testo, required: false },
  lexicalHTML('testo', { name: 'testo_html' }),
]

export const tabContenuto: Tab = {
  label: 'Contenuto',
  fields: contenutoFields,
}

export function titleAndText(name: string, label?: string): GroupField {
  return {
    name,
    type: 'group',
    label: label ?? capitalizeFirstLetter(name),
    fields: [
      {
        ...plainText(`title`),
        required: true,
        label: 'Titolo',
      },
      { ...richText('text'), label: 'Contenuto' },
      lexicalHTML('text', { name: 'text_html' }),
    ],
  }
}

export const socialNetworkLink: RowField = {
  type: 'row',
  fields: [nome, { ...link, required: true }],
}

export const socialNetworkLinks: ArrayField = {
  name: 'Link Social',
  type: 'array',
  localized: true,
  fields: [socialNetworkLink],
}
