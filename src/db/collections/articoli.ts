import { CollectionConfig } from 'payload'

import { Section } from '@/db/_partials'

import { CollectionGroup } from '../utils'

//

export const Articoli: CollectionConfig<'articoli'> = {
	slug: 'articoli',
	labels: {
		singular: 'Articolo',
		plural: 'Articoli',
	},
	admin: {
		useAsTitle: 'titolo',
		defaultColumns: ['titolo', 'testo', 'data_pubblicazione'],
		group: CollectionGroup.Principali,
	},

	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Dati',
					fields: [...Section.generale()],
				},
				// {
				// 	label: 'Contenuto',
				// 	fields: [
				// 		F.title('Informazioni generali'),
				// 		{
				// 			...F.plainText('titolo'),
				// 			required: true,
				// 			localized: true,
				// 		},
				// 		F.gap(20, 'gap-1'),
				// 		F.gap(20, 'gap-2'),
				// 		{
				// 			...F.plainText('sottotitolo'),
				// 			localized: true,
				// 		},
				// 		{
				// 			name: 'tags',
				// 			type: 'array',
				// 			label: 'Tags',
				// 			maxRows: 3,
				// 			fallback: false,
				// 			fields: [
				// 				{
				// 					name: 'tag',
				// 					type: 'text',
				// 					localized: true,
				// 				},
				// 			],
				// 		},
				// 		{
				// 			name: 'data_pubblicazione',
				// 			label: 'Data pubblicazione',
				// 			type: 'date',
				// 		},

				// 		...F.contenutoFields.map((field: any) => {
				// 			if (field.name === 'testo_html' || field.name === 'testo') {
				// 				return {
				// 					...field,
				// 					localized: true,
				// 				}
				// 			}
				// 			return field
				// 		}),
				// 	],
				// },
			],
		},
	],
}
