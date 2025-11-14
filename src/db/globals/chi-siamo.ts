import type { GlobalConfig } from 'payload'

import { Tab } from '@/db/_partials'

//

export const ChiSiamo: GlobalConfig = {
	slug: 'chi-siamo',
	label: 'Chi siamo',

	access: {
		read: () => true,
	},

	fields: [
		{
			type: 'tabs',
			tabs: [Tab.descrizione(), Tab.multimedia()],
		},
	],
}
