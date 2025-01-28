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

import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

import { capitalizeFirstLetter } from '@/utils/strings'

import { formatSlugHook } from './slug/formatSlug'

// Common field configurations
const defaultRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
})

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
  }) as TextField

const createRichTextField = (name: string, options: Partial<RichTextField> = {}): RichTextField =>
  ({
    name,
    type: 'richText',
    editor: defaultRichTextEditor,
    ...options,
  }) as RichTextField

const createRowField = (fields: Field[]): RowField =>
  ({
    type: 'row',
    fields,
  }) as RowField

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
  }) as ArrayField

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
  }) as UIField

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
  } as CheckboxField

  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    hooks: {
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
    ...(slugOverrides || {}),
  } as TextField

  return [slugField, checkBoxField]
}

export const title = (text: string): UIField =>
  createUIField(
    `header-${text.toLowerCase().replace(/\s+/g, '-')}`,
    '@/fields/components/header.tsx',
    { content: text },
  )

export const gap = (size: number, key: string): UIField =>
  createUIField(`gap-${key}`, '@/fields/components/gap.tsx', { size })

export const divider = (key: string): UIField =>
  createUIField(`divider-${key}`, '@/fields/components/divider.tsx', {})

export const nome = createRequiredField(createLocalizedField(createTextField('nome')))

export const link = createTextField('link')

export const testo = createLocalizedField(createRichTextField('testo', { label: 'Testo' }))

export const plainText = (name: string): TextField => createLocalizedField(createTextField(name))

export const plainTextRequired = (name: string): TextField => createRequiredField(plainText(name))

export const richText = (name: string): RichTextField =>
  createLocalizedField(createRichTextField(name))

export const posizione: PointField = {
  name: 'posizione',
  type: 'point',
}

export const linkConNome: RowField = createRowField([nome, createRequiredField(link)])

export const linkArray: ArrayField = createArrayField('links', linkConNome.fields, {
  label: 'Link',
})

export const programmaArray: ArrayField = createArrayField(
  'programma',
  [
    createTextField('programma', { label: 'giorno / momento' }),
    richText('testo'),
    lexicalHTML('testo', { name: 'testo_html' }),
  ],
  { label: 'Programma' },
)

export const contatti: ArrayField = createArrayField('contatti', [
  createRowField([nome, link]),
  createRowField([{ name: 'email', type: 'email' } as EmailField, createTextField('telefono')]),
])

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
  nome,
  link,
  createRequiredField(testo),
  lexicalHTML('testo', { name: 'testo_html' }),
])

const baseContentFields: Field[] = [
  title('Immagini e media'),
  media,
  galleria,
  title('Contenuti testuali'),
  createRequiredField(testo),
  lexicalHTML('testo', { name: 'testo_html' }),
]

export const contenutoFields: Field[] = baseContentFields

export const contenutoFieldsMedia: Field[] = [
  ...baseContentFields.slice(0, 2),
  {
    name: 'Video',
    type: 'relationship',
    relationTo: Collections.Media,
    required: false,
  },
  ...baseContentFields.slice(2),
]

export const contenutoFieldsUnrequired: Field[] = [
  ...baseContentFields.slice(0, 2),
  linkArray,
  ...baseContentFields.slice(2, -2),
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
      createRequiredField(createLocalizedField(createTextField('title', { label: 'Titolo' }))),
      createRequiredField(
        createLocalizedField(createRichTextField('text', { label: 'Contenuto' })),
      ),
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
      createLocalizedField(createTextField('title', { label: 'Titolo' })),
      createLocalizedField(createRichTextField('text', { label: 'Contenuto' })),
      lexicalHTML('text', { name: 'text_html' }),
    ],
  }
}

export const socialNetworkLink: RowField = createRowField([nome, createRequiredField(link)])

export const socialNetworkLinks: ArrayField = createArrayField('Link Social', [socialNetworkLink], {
  localized: true,
})
