import type { GlobalConfig } from 'payload'
import { Globals } from '.'

export const Info: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields:  [
    {
    name: 'Title',
    type: 'text', 
    required: true,
    },
    {
    name: 'Subtitle',
    type: 'text', 
    required: true,
    },
    {
    name: 'Via_line_1',
    type: 'text', 
    required: true,
    },
    {
    name: 'Civico_e_cap',
    type: 'text', 
    required: true,
    },
    {
    name: 'Citta',
    type: 'text', 
    required: true,
    },
    {
      name: 'Mail',
      type: 'text', 
      required: true,
      },
    {
    name: 'Orario_1',
    type: 'text', 
    required: true,
    },
    {
    name: 'Orario_2',
    type: 'text', 
    required: true,
    },
    {
    name: 'Orario_3',
    type: 'text', 
    required: true,
    },
    {
    name: 'Link_instagram',
    type: 'text', 
    required: true,
    },
    {
    name: 'Link_youtube',
    type: 'text', 
    required: true,
    },
    
],

    slug: Globals.Info,
}
