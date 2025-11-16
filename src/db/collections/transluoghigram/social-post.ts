import { CollectionConfig } from 'payload'

import { F } from '@/db/_partials'
import { CollectionGroup } from '@/db/utils'

//

export const SocialPost: CollectionConfig = {
	slug: 'social-post',

	labels: {
		singular: 'Post',
		plural: 'Posts',
	},

	admin: {
		useAsTitle: 'text',
		group: CollectionGroup.Transluoghigram,
	},

	access: {
		read: () => true,
		create: ({ req: { user } }) => user !== null,
	},

	fields: [
		{
			name: 'text',
			type: 'text',
		},

		F.url({ name: 'link', label: 'Link' }),

		{
			name: 'media',
			type: 'upload',
			relationTo: 'social-media',
		},

		{
			name: 'owner',
			type: 'relationship',
			relationTo: 'social-account',
			required: true,
			hooks: {
				beforeValidate: [
					({ value, req }) => {
						if (value && req.user?.collection == 'users') {
							return value
						} else if (req.user?.collection == 'social-account') {
							return req.user?.id
						}
						throw new Error('Unexpected error')
					},
				],
			},
		},
	],
}
