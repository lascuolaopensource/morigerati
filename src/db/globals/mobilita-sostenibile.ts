import type { GlobalConfig } from 'payload'

import { Tab } from '@/db/_partials'

//

export const MobilitaSostenibile: GlobalConfig = {
	slug: 'mobilita-sostenibile',
	label: 'Mobilità sostenibile',

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
