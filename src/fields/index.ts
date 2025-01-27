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
  CheckboxField
} from 'payload'
import { Collections } from '@/db/collections'

import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

import { capitalizeFirstLetter } from '@/utils/strings'

import { formatSlugHook } from './slug/formatSlug'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  }

  // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  // @ts-expect-error
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    ...(slugOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  return [slugField, checkBoxField]
}

export function title(text: string): UIField {
  return {
    name: `header-${text.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '@/fields/components/header.tsx',
          clientProps: {
            content: text,
          },
        },
      },
    },
  }
}

export function gap(size: number, key: string): UIField {
  return {
    name: `gap-${key}`,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '@/fields/components/gap.tsx',
          clientProps: {

            size: size,
          },
        },
      },
    },
  }
}

export function divider(key: string): UIField {
  return {
    name: `divider-${key}`,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '@/fields/components/divider.tsx',
          clientProps: {
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
  label: 'Copertina',
  type: 'relationship',
  relationTo: Collections.Media,
}

export const tracciati: RelationshipField = {
  name: 'tracciato',
  label: 'tracciato',
  type: 'relationship',
  relationTo: Collections.Tracciati,
}

export const galleria: RelationshipField = {
  name: 'galleria',
  label: 'Galleria',
  type: 'relationship',
  hasMany: true,
  relationTo: Collections.Media,
}

export const servizi: ArrayField = {
  name: 'servizi',
  type: 'array',
  fields: [nome, link, { ...testo, required: true }, lexicalHTML('testo', { name: 'testo_html' })],
}

export const contenutoFields: Field[] = [
  title('Immagini e media'),
  media,
  galleria,

  title('Contenuti testuali'),
  { ...testo, required: true },
  lexicalHTML('testo', { name: 'testo_html' }),
]

export const contenutoFieldsMedia: Field[] = [
  title('Immagini e media'),
  media,
  {
    name: 'Video',
    type: 'relationship',
    relationTo: Collections.Media,
    required: false,
  },
  galleria,

  title('Contenuti testuali'),
  { ...testo, required: true },
  lexicalHTML('testo', { name: 'testo_html' }),
]

export const contenutoFieldsUnrequired: Field[] = [
  title('Immagini e media'),
  media,
  linkArray,
  galleria,

  title('Contenuti testuali'),
  { ...testo, required: false },
  lexicalHTML('testo', { name: 'testo_html' }),
]

export const tabContenuto: Tab = {
  label: 'Contenuto',
  fields: contenutoFields,
}

export const tabContenutoItinerario: Tab = {
  label: 'Contenuto',
  fields: contenutoFieldsMedia,
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
      { ...richText('text'), label: 'Contenuto', required: true },
      lexicalHTML('text', { name: 'text_html' }),
    ],
  }
}

export function titleAndTextOptional(name: string, label?: string): GroupField {
  return {
    name,
    type: 'group',
    label: label ?? capitalizeFirstLetter(name),
    fields: [
      {
        ...plainText(`title`),
        required: false,
        label: 'Titolo',
      },
      { ...richText('text'), label: 'Contenuto', required: false },
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
