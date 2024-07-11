import type { GlobalConfig } from 'payload'
import { contenutoFields } from '../../collections/fields'
import { Globals } from '.'


export const Home: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields:  [{
    name: 'statement', 
    type: 'text', 
    required: true,
  },
  {
    name: 'media', 
    type: 'upload', 
    relationTo: 'media',
    required: true,
  },
  {
    name: 'testoHome', 
    type: 'richText', 
    required: true,
  },
  {
    name: 'itinerari', 
    type: 'richText', 
    required: true,
  },
  {
    name: 'luoghi', 
    type: 'richText', 
    required: true,
  },
  {
    name: 'residenze', 
    type: 'richText', 
    required: true,
  },


],
  slug: Globals.Home,
}