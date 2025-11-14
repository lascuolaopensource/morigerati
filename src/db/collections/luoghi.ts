import type { CollectionConfig } from 'payload'

import { F, Section, Tab } from '@/db/_partials'

import { CollectionGroup } from '../utils'

//

export const Luoghi: CollectionConfig<'luoghi'> = {
	slug: 'luoghi',

	labels: {
		singular: 'Luogo',
		plural: 'Luoghi',
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
						F.row([
							{ name: 'address', label: 'Indirizzo', type: 'text' },
							{
								name: 'coordinates',
								label: 'Posizione',
								type: 'point',
							},
						]),
						F.plainRichText({ name: 'timetable', label: 'Orari di attività e date di chiusura' }),
						F.contatti(),
					],
				},

				Tab.descrizione(),
				Tab.servizi(),
				Tab.multimedia(),
			],
		},
	],
}
