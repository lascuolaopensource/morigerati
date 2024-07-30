import {
  ArrayField,
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

import { Divider } from './components/divider'
import { Header } from './components/header'
import { capitalizeFirstLetter } from '@/utils/strings'

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

export function title(text: string): UIField {
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
  localized: true,
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
  localized: true,
}

export const linkConNome: RowField = {
  type: 'row',
  fields: [nome, link],
}

export const contatti: ArrayField = {
  name: 'contatti',
  type: 'array',
  localized: true,
  fields: [
    linkConNome,
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          localized: true,
        },
        {
          name: 'telefono',
          type: 'text',
          localized: true,
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
  title('Immagini e media'),
  media,
  divider,
  title('Contenuti testuali'),
  testo,
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
