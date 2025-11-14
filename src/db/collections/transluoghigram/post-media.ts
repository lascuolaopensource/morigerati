import type { CollectionConfig } from 'payload'

import { Collections } from '.'
import { imageSizes } from '../../utils'

export const PostMedia = {
	slug: Collections.PostMedia,

	access: {
		read: () => true,
		create: ({ req: { user } }) => {
			return user !== null
		},
	},

	upload: {
		adminThumbnail: 'thumbnail',
		imageSizes,
		formatOptions: { format: 'webp' },
		mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
		staticDir: 'data/post-media',
	},
	fields: [],

	//
} satisfies CollectionConfig
