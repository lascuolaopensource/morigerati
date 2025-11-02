import type { GlobalConfig } from 'payload'

import {
	BoldFeature,
	InlineToolbarFeature,
	ItalicFeature,
	lexicalEditor,
	LinkFeature,
	ParagraphFeature,
	UnderlineFeature,
} from '@payloadcms/richtext-lexical'

import * as F from '@/db/fields'

//

export const Home: GlobalConfig = {
	slug: 'home',
	access: {
		read: () => true,
	},
	fields: [
		F.title('Copertina'),
		F.plainText('statement'),
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
