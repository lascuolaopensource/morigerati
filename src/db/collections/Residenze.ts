import * as F from '@/db/_partials/fields'
import { formatSlug } from '@/db/_partials/slug/formatSlug'
import { CollectionConfig } from 'payload'

import { slugField } from '@/db/_partials/fields'
import { BoldFeature, lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

export const Residenze: CollectionConfig<'residenze'> = {
	slug: 'residenze',
	labels: {
		singular: 'Residenza',
		plural: 'Residenze',
	},
	admin: {
		defaultColumns: ['nome', 'abstract'],
		useAsTitle: F.nome.name,
	},

	hooks: {
		beforeChange: [
			async ({ req, data, originalDoc, operation }) => {
				// For localized fields, ensure the slug is properly updated for each locale
				if (data.nome && typeof data.nome === 'object') {
					// Initialize slug object if it doesn't exist
					if (!data.slug) {
						data.slug = {}
					} else if (typeof data.slug === 'string') {
						// If slug exists as a string, convert to object
						const defaultSlug = data.slug
						data.slug = { [req.locale || 'it']: defaultSlug }
					}

					// Generate slug for each locale in nome
					Object.entries(data.nome).forEach(([locale, value]) => {
						if (typeof value === 'string' && value.trim()) {
							// Only update if nome is not empty
							data.slug[locale] = formatSlug(value)
						}
					})
				}

				return data
			},
		],
	},

	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Generali',
					fields: [
						F.title('Informazioni generali'),
						F.nome,

						F.divider('divider-X'),
						{
							name: 'data_inizio',
							label: 'Data inizio',
							type: 'date',
							admin: {
								date: {
									displayFormat: 'dd/MM/yyyy',
								},
							},
							required: true,
						},
						{
							name: 'data_fine',
							label: 'Data fine',
							type: 'date',
							admin: {
								date: {
									displayFormat: 'dd/MM/yyyy',
								},
							},
						},

						F.divider('divider-1'),
						{
							name: 'deadline_iscrizione',
							label: 'Scadenza iscrizioni',
							type: 'date',
							admin: {
								date: {
									displayFormat: 'dd/MM/yyyy',
								},
							},
						},
						{
							name: 'link_iscrizione',
							label: 'Link iscrizione',
							type: 'text',
						},
						{
							name: 'mostra_pulsante_iscrizione',
							type: 'checkbox',
							label: 'Mostra pulsante iscrizione',
							defaultValue: false,
						},
						F.divider('divider-2'),
						{
							name: 'indirizzo',
							label: 'Indirizzo / luogo',
							type: 'text',
						},
					],
				},

				/* -- Testi -- */

				{
					label: 'Testi',
					fields: [
						F.title('Testi'),
						{
							...F.testo,
							name: 'abstract',
							label: 'Abstract',
						},

						F.divider('divider-4'),

						{
							...F.testo,
							name: 'descrizione',
							label: 'Descrizione',
						},
					],
				},

				{ label: 'Media', fields: [F.title('Media'), F.media, F.galleria] },

				{ label: 'Programma', fields: [F.programmaArray] },

				{
					label: 'Tutor ed esperti',
					fields: [
						{
							name: 'esperti',
							label: 'Tutor ed esperti',
							type: 'array',

							fields: [
								{
									type: 'row',
									fields: [
										{
											name: 'nome',
											type: 'text',
											label: 'Nome',
										},
										{
											...F.media,
											name: 'foto',
										},
									],
								},
								{
									name: 'biografia',
									type: 'richText',
									label: 'Biografia',
									localized: true,
									editor: lexicalEditor({ features: () => [ParagraphFeature(), BoldFeature()] }),
								},

								{
									name: 'progetti',
									type: 'array',
									fields: [F.linkConNome],
								},
								{
									name: 'organizzazioni',
									type: 'array',
									fields: [F.linkConNome],
								},
							],
						},
					],
				},
				{
					label: 'Link',
					fields: [...slugField('nome')],
				},
			],
		},
	],
}
