import { PointField, RichTextField, Tab, TextField } from 'payload/types'

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

export const tabContenuto: Tab = {
  label: 'Contenuto',
  fields: [
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'descrizione',
      type: 'richText',
    },
  ],
}
