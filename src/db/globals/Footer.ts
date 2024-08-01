import type { GlobalConfig, RichTextField } from 'payload'
import { Globals } from '.'
import * as F from '@/db/fields'
import {
  lexicalEditor,
  BoldFeature,
  InlineToolbarFeature,
  ParagraphFeature,
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
      ...baseRichText('testo_sinistra'),
      label: 'Testo a sinistra',
    },

    {
      ...baseRichText('testo_destra'),
      label: 'Testo a destra',
    },

    F.divider,

    F.socialNetworkLinks,
  ],
}

function baseRichText(name: string): RichTextField {
  return {
    name,
    type: 'richText',
    required: true,
    localized: true,
    editor: lexicalEditor({
      features: () => [InlineToolbarFeature(), ParagraphFeature(), BoldFeature()],
    }),
  }
}
