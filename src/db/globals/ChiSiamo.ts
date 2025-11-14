import * as F from '@/db/_partials'
import type { GlobalConfig } from 'payload'
import { Globals } from '.'

export const ChiSiamo: GlobalConfig = {
	slug: Globals.ChiSiamo,
	label: 'Chi siamo',

	access: {
		read: () => true,
	},

	fields: [
		{
			name: 'copertina',
			type: 'upload',
			label: 'Immagine di copertina',
			relationTo: 'media',
		},
		{
			name: 'testo_chi_siamo',
			type: 'richText',
			label: 'Testo "Chi siamo"',
			localized: true,
		},
		F.divider('divider-1'),
		F.galleria,
	],
}
