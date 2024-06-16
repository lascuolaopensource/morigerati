import {
  ArrayField,
  PointField,
  RelationshipField,
  RichTextField,
  Tab,
  TextField,
} from 'payload/types'
import { Collections } from '..'

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

export const descrizione: RichTextField = {
  name: 'descrizione',
  type: 'richText',
  localized: true,
}

export const posizione: PointField = {
  name: 'posizione',
  type: 'point',
}

export const contatti: ArrayField = {
  name: 'contatti',
  type: 'array',
  fields: [
    nome,
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'telefono',
      type: 'text',
    },
    link,
  ],
}

export const media: RelationshipField = {
  name: 'media',
  type: 'relationship',
  relationTo: Collections.Media,
}

export const servizi: ArrayField = {
  name: 'servizi',
  type: 'array',
  fields: [
    {
      type: 'row',
      fields: [nome, link],
    },
    descrizione,
  ],
}

export const tabContenuto: Tab = {
  label: 'Contenuto',
  fields: [media, descrizione],
}
