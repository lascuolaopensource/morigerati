import type { GlobalConfig } from 'payload'
import { Globals } from '.'
import * as F from '@/db/fields'
import {
  lexicalEditor,
  lexicalHTML,
  BoldFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  HTMLConverterFeature
} from '@payloadcms/richtext-lexical'



export const Footer: GlobalConfig = {
  slug: Globals.Footer,

  access: {
    read: () => true,
  },

  fields: [
    {
      ...F.plainTextRequired('title'),
      label: 'Titolo',
    },

    F.divider,

    {
      name: 'testo_sinistra',
      type: 'richText',
      label: 'Testo a sinistra',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ()  => [
          InlineToolbarFeature(),
          ParagraphFeature(),
          BoldFeature(),
        ],
        
      }),
      
    },

    {
      name: 'testo_destra',
      type: 'richText',
      label: 'Testo a destra',
      required: true,
      localized: true,
    },

    F.divider,

    F.socialNetworkLinks,
  ],
}
