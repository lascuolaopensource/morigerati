import { CollectionConfig } from 'payload'

import { F } from '@/db/_partials'

//

export const Post: CollectionConfig = {
	slug: 'post',

	labels: {
		singular: 'Post',
		plural: 'Posts',
	},

	admin: {
		useAsTitle: 'text',
	},

	access: {
		read: () => true,
		create: ({ req: { user } }) => user !== null,
	},

	fields: [
		{
			name: 'text',
			type: 'text',
			required: true,
		},
		F.url({ name: 'link', label: 'Link' }),
		// {
		// 	name: 'media',
		// 	type: 'upload',
		// 	relationTo: 'post-media',
		// },
		// {
		// 	name: 'owner',
		// 	type: 'relationship',
		// 	relationTo: 'account',
		// 	required: true,
		// 	hooks: {
		// 		beforeValidate: [
		// 			({ value, req }) => {
		// 				if (value && req.user?.collection == 'users') {
		// 					return value
		// 				} else if (req.user?.collection == 'account') {
		// 					return req.user?.id
		// 				}
		// 				throw new Error('Unexpected error')
		// 			},
		// 		],
		// 	},
		// },
	],
}
