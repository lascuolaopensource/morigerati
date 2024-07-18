import {
  ArrayField,
  PointField,
  RelationshipField,
  RichTextField,
  RowField,
  Tab,
  TextField,
  UIField,
} from 'payload'
import { Collections } from '@/db/collections'

import { Divider } from './components/divider'
import { Header } from './components/header'

//

export const divider: UIField = {
  name: 'divider',
  type: 'ui',
  admin: {
    components: {
      Field: Divider,
    },
  },
}

export function header(text: string): UIField {
  return {
    name: 'header',
    type: 'ui',
    admin: {
      components: {
        Field: () => Header(text),
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
  }
}

export const posizione: PointField = {
  name: 'posizione',
  type: 'point',
}

export const linkConNome: RowField = {
  type: 'row',
  fields: [nome, link],
}

export const contatti: ArrayField = {
  name: 'contatti',
  type: 'array',
  fields: [
    linkConNome,
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
  name: 'media',
  type: 'relationship',
  relationTo: Collections.Media,
}

export const itinerari: RelationshipField = {
  name: 'itinerari',
  type: 'relationship',
  relationTo: [Collections.Itinerari],
}

export const servizi_con_link: ArrayField = {
  name: 'servizi',
  type: 'array',
  fields: [linkConNome, testo],
}

export const servizi: ArrayField = {
  name: 'servizi',
  type: 'array',
  fields: [nome, testo],
}

export const contenutoFields = [
  header('Immagini e media'),
  media,
  divider,
  header('Contenuti testuali'),
  testo,
]

export const tabContenuto: Tab = {
  label: 'Contenuto',
  fields: contenutoFields,
}

export function titoloTesto(name: string) {
  return [
    divider,
    header(name),
    {
      ...plainText(`${name}_title`),
      required: true,
      label: 'Titolo sezione',
    },
    { ...richText(name), label: 'Contenuto' },
  ]
}
