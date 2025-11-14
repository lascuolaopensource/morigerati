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
						// F.nome,
						// {
						//   ...F.posizione,
						// },

						// F.divider('divider-1'),
						// {
						//   ...F.servizi,
						// },
						// F.divider('divider-2'),
						// {
						//   ...F.contatti,
						// },
						// F.divider('divider-3'),
						// F.title('Orari'),
						// {
						//   name: 'orari',
						//   type: 'richText',
						//   label: 'Orari di attività e date di chiusura',
						//   localized: true,
						//   editor: lexicalEditor({
						//     features: () => [
						//       InlineToolbarFeature(),
						//       ParagraphFeature(),
						//       BoldFeature(),
						//       InlineToolbarFeature(),
						//     ],
						//   }),
						// },
					],
				},
				Tab.descrizione(),
				Tab.servizi(),
				Tab.multimedia(),
			],
		},
	],
}
