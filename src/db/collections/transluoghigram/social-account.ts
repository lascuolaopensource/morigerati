import { CollectionConfig } from 'payload'

import { CollectionGroup } from '@/db/utils'

//

export const SocialAccount: CollectionConfig = {
	slug: 'social-account',

	labels: {
		singular: 'Account',
		plural: 'Accounts',
	},

	admin: {
		useAsTitle: 'name',
		group: CollectionGroup.Transluoghigram,
	},

	access: {
		read: () => true,
		admin: () => false,
	},
	auth: true,

	fields: [
		{
			name: 'name',
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
