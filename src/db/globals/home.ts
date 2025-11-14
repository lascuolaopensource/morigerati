import type { GlobalConfig } from 'payload'

import * as F from '@/db/_partials'

//

export const Home: GlobalConfig = {
	slug: 'home',
	access: {
		read: () => true,
	},
	fields: [
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
		{
			type: 'group',
			name: 'sections',
			label: 'Sezioni',
			admin: { hideGutter: true },
			required: true,
			fields: [
				F.titleAndDescription('itinerari', 'Itinerari'),
				F.titleAndDescription('luoghi', 'Luoghi'),
				F.titleAndDescription('residenze', 'Residenze'),
			],
		},
	],
}
