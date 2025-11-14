import { CollectionConfig } from 'payload'

//

export const Account: CollectionConfig = {
	slug: 'account',

	labels: {
		singular: 'Account',
		plural: 'Accounts',
	},

	admin: {
		useAsTitle: 'nome',
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
