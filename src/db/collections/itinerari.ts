import { type CollectionConfig, type Field } from 'payload'

import * as F from '@/db/fields'

import { CollectionGroup } from '../utils'

//

export const Itinerari: CollectionConfig = {
	slug: 'itinerari',

	labels: {
		singular: 'Itinerario',
		plural: 'Itinerari',
	},

	admin: {
		defaultColumns: [F.name.name],
		useAsTitle: F.name.name,
		group: CollectionGroup.Principali,
	},

	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Dati',
					fields: [F.header('Generale'), F.nameAndSlug(), F.divider(), ...informazioniTecniche()],
				},

				{
					label: 'Descrizione',
					fields: [
						F.richText({
							label: 'Descrizione',
							name: 'description',
							required: true,
						}),
					],
				},

				{
					label: 'Servizi',
					fields: [
						{
							name: 'services',
							type: 'array',
							admin: {
								components: {
									RowLabel: {
										path: 'src/db/fields/components/array-row-label.tsx',
										clientProps: { fieldToUse: F.name.name },
									},
								},
							},
							fields: [
								F.name,
								F.plainRichText({
									name: 'description',
									label: 'Descrizione',
									required: true,
								}),
								F.url({
									label: 'URL (opzionale)',
								}),
							],
						},
					],
				},

				{
					label: 'Contenuti collegati',
					fields: [
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
					],
				},

				{
					label: 'Multimedia',
					fields: [
						F.video({ name: 'video', label: 'Video' }),
						F.media({ name: 'gallery', label: 'Galleria', hasMany: true }),
						{
							name: 'geolocalized_media',
							label: 'Media geolocalizzati',
							type: 'array',
							fields: [
								{ name: 'position', type: 'point', required: true },
								F.media({ name: 'image', label: 'Immagine', required: true }),
							],
						},
					],
				},
			],
		},
	],
}

function informazioniTecniche(): Field[] {
	return [
		F.header('Informazioni tecniche'),
		F.row([
			{
				name: 'length',
				label: 'Lunghezza itinerario (metri)',
				type: 'number',
			},
			{
				name: 'duration',
				label: 'Durata (ore)',
				type: 'number',
			},
		]),
		F.row([
			{
				name: 'elevation',
				label: 'Dislivello (metri)',
				type: 'text',
			},
			{
				name: 'type',
				label: 'Tipo di itinerario',
				type: 'select',
				options: [
					{
						label: 'Itinerario ad anello',
						value: 'loop',
					},
					{
						label: 'Andata e ritorno',
						value: 'out_and_back',
					},
				],
			},
		]),
		F.row([
			{
				name: 'difficulty',
				label: 'Difficoltà',
				type: 'select',
				options: [
					{
						label: 'T - Turistico',
						value: 'touristic',
					},
					{
						label: 'E - Escursionistico',
						value: 'hiking',
					},
					{
						label: 'EE - Escursionisti Esperti',
						value: 'expert_hiking',
					},
				],
			},
			F.upload({ name: 'gpx_track', label: 'Tracciato GPX', collection: 'tracciati' }),
		]),
	]
}
