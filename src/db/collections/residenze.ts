import type { CollectionConfig } from 'payload'

import { F, Section, Tab } from '@/db/_partials'

import { CollectionGroup } from '../utils'

//

export const Residenze: CollectionConfig<'residenze'> = {
	slug: 'residenze',

	labels: {
		singular: 'Residenza',
		plural: 'Residenze',
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
					fields: [
						...Section.generale(),
						F.header('Informazioni tecniche'),
						F.location(),
						F.row([
							F.date({ name: 'start_date', label: 'Data inizio', required: true }),
							F.date({ name: 'end_date', label: 'Data fine' }),
						]),
						F.row([
							F.date({ name: 'registration_deadline', label: 'Scadenza iscrizioni' }),
							F.url({ name: 'registration_url', label: 'Link iscrizioni' }),
						]),
						{
							name: 'show_registration_button',
							type: 'checkbox',
							label: 'Mostra pulsante iscrizione',
						},
					],
				},

				{
					label: 'Testi',
					fields: [
						F.plainRichText({ name: 'short_description', label: 'Descrizione breve' }),
						F.richText({ name: 'description', label: 'Descrizione' }),
					],
				},

				{
					label: 'Programma',
					fields: [
						F.array({
							name: 'program',
							fieldForRowLabel: 'step_name',
							fields: [
								{
									name: 'step_name',
									label: 'Giorno / Momento',
									type: 'text',
									localized: true,
								},
								F.richText({ name: 'step_description', label: 'Descrizione' }),
							],
						}),
					],
				},

				{
					label: 'Persone coinvolte',
					fields: [
						F.array({
							name: 'people',
							label: 'Tutor, esperti e collaboratori',
							fieldForRowLabel: F.name.name,
							fields: [
								F.row([F.name, F.media({ name: 'foto', label: 'Foto' })]),
								F.plainRichText({ name: 'bio', label: 'Breve biografia' }),
								F.links({
									name: 'projects',
									label: 'Progetti salienti',
								}),
								F.links({
									name: 'organizations',
									label: 'Organizzazioni',
								}),
							],
						}),
					],
				},

				{
					label: 'Racconto risultati',
					fields: [F.richText({ name: 'story', label: 'Racconto' })],
				},

				Tab.multimedia(),
			],
		},
	],
}
