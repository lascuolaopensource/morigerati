import type { CollectionConfig } from 'payload'

import * as F from '@/db/fields'

//

export const Itinerari: CollectionConfig = {
	slug: 'itinerari',
	defaultPopulate: {
		slug: true,
	},
	labels: {
		singular: 'Itinerario',
		plural: 'Itinerari',
	},
	admin: {
		defaultColumns: [F.name.name],
		useAsTitle: F.name.name,
	},

	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Dati',
					fields: [F.name],
				},
				// {
				// 	label: 'Dati',
				// 	fields: [
				// 		F.title('Generale'),
				// 		F.nome,

				// 		{
				// 			...F.tracciati,
				// 			name: 'tracciato_gpx',
				// 			label: 'Tracciato GPX',
				// 		},

				// 		F.divider('divider-4'),

				// 		F.title('Informazioni tecniche'),
				// 		{
				// 			type: 'row',
				// 			fields: [
				// 				{
				// 					name: 'lunghezza',
				// 					label: 'Lunghezza itinerario (metri)',
				// 					type: 'number',
				// 				},
				// 				{
				// 					name: 'tempo',
				// 					label: 'Durata (ore)',
				// 					type: 'number',
				// 				},
				// 				{
				// 					name: 'dislivello',
				// 					label: 'Dislivello (metri)',
				// 					type: 'text',
				// 				},
				// 			],
				// 		},
				// 		{
				// 			type: 'row',
				// 			fields: [
				// 				{
				// 					name: 'tipo',
				// 					type: 'select',
				// 					admin: {
				// 						isClearable: true,
				// 						isSortable: true,
				// 					},
				// 					options: [
				// 						{
				// 							label: 'Itinerario ad anello',
				// 							value: 'Itinerario ad anello',
				// 						},
				// 						{
				// 							label: 'Andata e ritorno',
				// 							value: 'Andata e ritorno',
				// 						},
				// 					],
				// 				},
				// 				{
				// 					name: 'difficolta',
				// 					label: 'Difficoltà',
				// 					type: 'select',

				// 					admin: {
				// 						isClearable: true,
				// 					},
				// 					options: [
				// 						{
				// 							label: 'T - Turistico',
				// 							value: 'T - Turistico',
				// 						},
				// 						{
				// 							label: 'E - Escursionistico',
				// 							value: 'E - Escursionistico',
				// 						},
				// 						{
				// 							label: 'EE - Escursionisti Esperti',
				// 							value: 'EE - Escursionisti Esperti',
				// 						},
				// 					],
				// 				},
				// 			],
				// 		},

				// 		F.divider('divider-1'),

				// 		{
				// 			name: 'servizi',
				// 			type: 'array',

				// 			fields: [
				// 				{
				// 					name: 'nome',
				// 					type: 'text',
				// 					label: 'Nome',
				// 					localized: true,
				// 				},
				// 				F.link,
				// 				{
				// 					name: 'testo',
				// 					type: 'richText',
				// 					label: 'Testo',
				// 					localized: true,
				// 					editor: lexicalEditor({
				// 						features: () => [InlineToolbarFeature(), ParagraphFeature(), BoldFeature()],
				// 					}),
				// 				},
				// 			],
				// 		},

				// 		F.divider('divider-2'),

				// 		F.title('Contenuti collegati'),
				// 		{
				// 			name: 'luoghi',
				// 			type: 'relationship',
				// 			relationTo: Collections.Luoghi,
				// 			hasMany: true,
				// 		},
				// 		{
				// 			name: 'persone',
				// 			type: 'relationship',
				// 			relationTo: Collections.Persone,
				// 			hasMany: true,
				// 		},

				// 		F.divider('divider-3'),

				// 		{
				// 			name: 'media_geolocalizzati',
				// 			label: 'Media geolocalizzati',
				// 			type: 'array',

				// 			fields: [
				// 				{ name: 'posizione', type: 'point', required: true },
				// 				{ ...F.media, required: true },
				// 			],
				// 		},
				// 	],
				// },

				F.tabContenuto({ video: true }),
			],
		},
	],
}
