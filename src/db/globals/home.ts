import type { GlobalConfig } from 'payload'

import * as F from '@/db/fields'

//

export const Home: GlobalConfig = {
	slug: 'home',
	access: {
		read: () => true,
	},
	fields: [
		F.header('Copertina'),
		F.media({
			name: 'cover',
			label: 'Immagine di copertina',
			required: true,
		}),
		{
			name: 'statement',
			type: 'text',
			required: true,
			localized: true,
		},
		F.plainRichText({
			name: 'introduzione',
			label: 'Introduzione',
			required: true,
		}),
		// {
		// 	...F.media,
		// 	name: 'cover',
		// 	label: 'Immagine di copertina',
		// },
		// {
		// 	name: 'title',
		// 	type: 'text',
		// 	label: 'Titolo',
		// 	localized: true,
		// },
		// {
		// 	name: 'testo',
		// 	type: 'richText',
		// 	label: 'Testo',
		// 	localized: true,
		// 	editor: lexicalEditor({
		// 		features: () => [
		// 			ParagraphFeature(),
		// 			BoldFeature(),
		// 			ItalicFeature(),
		// 			UnderlineFeature(),
		// 			LinkFeature(),
		// 			InlineToolbarFeature(),
		// 		],
		// 	}),
		// },
		// F.titleAndTextHome('itinerari'),
		// F.titleAndTextHome('luoghi'),
		// F.titleAndTextHome('residenze'),
	],
}
