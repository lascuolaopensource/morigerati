import type { GlobalConfig } from 'payload'
import * as F from '@/fields'
import { Globals } from '.'
import {
  BoldFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
export const Home: GlobalConfig = {
  slug: Globals.Home,

  access: {
    read: () => true,
  },

  fields: [
    F.title('Copertina'),
    {
      ...F.plainText('statement'),
    },
    {
      ...F.media,
      name: 'cover',
      label: 'Immagine di copertina',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titolo',
      localized: true,
    },
    {
      name: 'testo',
      type: 'richText',
      label: 'Testo',
      localized: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    F.titleAndTextHome('itinerari'),
    F.titleAndTextHome('luoghi'),
    F.titleAndTextHome('residenze'),
  ],
}
