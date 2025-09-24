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
  CheckboxField,
  EmailField,
} from 'payload'
import { Collections } from '@/db/collections'

import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  UnderlineFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

import { capitalizeFirstLetter } from '#/utils/strings'

import { formatSlugHook } from './slug/formatSlug'

// Field factory functions
const createLocalizedField = <T extends Field>(field: T): T => ({
  ...field,
  localized: true,
})

const createRequiredField = <T extends Field>(field: T): T => ({
  ...field,
  required: true,
})

const createTextField = (name: string, options: Partial<TextField> = {}): TextField =>
  ({
    name,
    type: 'text',
    ...options,
  } as TextField)

const createRichTextField = (name: string): RichTextField =>
  ({
    name,
    type: 'richText',
  } as RichTextField)

const createHomeRichTextField = (name: string): RichTextField =>
  ({
    name,
    type: 'richText',
    editor: lexicalEditor({
      features: () => [
        ParagraphFeature(),
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        InlineToolbarFeature(),
      ],
    }),
  } as RichTextField)

const createRowField = (fields: Field[]): RowField =>
  ({
    type: 'row',
    fields,
  } as RowField)

const createArrayField = (
  name: string,
  fields: Field[],
  options: Partial<ArrayField> = {},
): ArrayField =>
  ({
    name,
    type: 'array',
    fields,
    ...options,
  } as ArrayField)

const createUIField = (name: string, componentPath: string, clientProps = {}): UIField =>
  ({
    name,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: componentPath,
          clientProps,
        },
      },
    },
  } as UIField)

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
  localized?: boolean
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides, localized = false } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  } as CheckboxField

  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    localized,
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/db/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
    ...(slugOverrides || {}),
  } as TextField

  return [slugField, checkBoxField]
}

export const title = (text: string): UIField =>
  createUIField(
    `header-${text.toLowerCase().replace(/\s+/g, '-')}`,
    '@/db/fields/components/header.tsx',
    { content: text },
  )

export const gap = (size: number, key: string): UIField =>
  createUIField(`gap-${key}`, '@/db/fields/components/gap.tsx', { size })

export const divider = (key: string): UIField =>
  createUIField(`divider-${key}`, '@/db/fields/components/divider.tsx', {})

export const nome = createRequiredField(createTextField('nome'))

export const link = createTextField('link')

export const testo = createLocalizedField(createRichTextField('testo'))

export const plainText = (name: string): TextField => createLocalizedField(createTextField(name))

export const posizione: PointField = {
  name: 'posizione',
  type: 'point',
}

export const linkConNome: RowField = createRowField([
  createRequiredField(createTextField('nome')),
  createRequiredField(link),
])

export const programmaArray: ArrayField = createArrayField(
  'programma',
  [
    createTextField('programma', { label: 'giorno / momento', localized: true }),
    {
      name: 'testo',
      type: 'richText',
      label: 'testo',
      localized: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
        ],
      }),
    },
  ],
  {
    label: 'Programma',
  },
)

export const contatti: ArrayField = createArrayField(
  'contatti',
  [
    createRowField([nome, link]),
    createRowField([{ name: 'email', type: 'email' } as EmailField, createTextField('telefono')]),
  ],
  {},
)

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

export const servizi: ArrayField = createArrayField('servizi', [
  {
    name: 'nome',
    type: 'text',
    label: 'Nome',
    localized: true,
  },
  link,
  {
    name: 'testo',
    type: 'richText',
    label: 'testo',
    localized: true,
    editor: lexicalEditor({
      features: () => [ParagraphFeature()],
    }),
  },
])

const baseContentFields: Field[] = [
  title('Immagini e media'),
  media,
  galleria,
  title('Contenuti testuali'),
  createRequiredField(testo),
]

export const contenutoFields: Field[] = baseContentFields

const contenutoFieldsMedia: Field[] = [
  ...baseContentFields.slice(0, 2),
  {
    name: 'Video',
    type: 'relationship',
    relationTo: Collections.Media,
    required: false,
  },
  ...baseContentFields.slice(2),
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
      createRequiredField(createLocalizedField(createTextField('title', { label: 'Titolo' }))),
      createRequiredField(createLocalizedField(createRichTextField('testo'))),
    ],
  }
}

export function titleAndTextHome(name: string, label?: string): GroupField {
  return {
    name,
    type: 'group',
    label: label ?? capitalizeFirstLetter(name),
    fields: [
      createRequiredField(createLocalizedField(createTextField('title', { label: 'Titolo' }))),
      createRequiredField(createLocalizedField(createHomeRichTextField('testo'))),
    ],
  }
}

const socialNetworkLink: RowField = createRowField([nome, createRequiredField(link)])

export const socialNetworkLinks: ArrayField = createArrayField(
  'Link Social',
  [socialNetworkLink],
  {},
)
