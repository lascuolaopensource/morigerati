import { CollectionConfig } from 'payload'

import { CollectionGroup } from '@/db/utils'

//

export const Account: CollectionConfig = {
	slug: 'account',

	labels: {
		singular: 'Account',
		plural: 'Accounts',
	},

	admin: {
		useAsTitle: 'nome',
		group: CollectionGroup.Transluoghigram,
	},

	access: {
		read: () => true,
		admin: () => false,
	},
	auth: true,

	fields: [
		{
			name: 'nome',
			type: 'text',
			required: true,
		},
		{
			name: 'persona',
			type: 'relationship',
			relationTo: 'persone',
		},
	],
}
