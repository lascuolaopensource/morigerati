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
						F.location(),
						F.plainRichText({ name: 'timetable', label: 'Orari di attività e date di chiusura' }),
						F.contatti(),
						F.divider(),
						F.header('Itinerari correlati'),
						F.join({ name: 'itinerari', collection: 'itinerari', on: 'luoghi' }),
					],
				},
				Tab.descrizione(),
				Tab.servizi(),
				Tab.multimedia(),
			],
		},
	],
}
