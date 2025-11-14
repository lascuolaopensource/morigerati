import type { CollectionConfig } from 'payload'

import { CollectionGroup, imageSizes } from '../../utils'

//

export const PostMedia = {
	slug: 'post-media',

	admin: {
		group: CollectionGroup.Transluoghigram,
	},

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
		mimeTypes: [
			'image/jpeg',
			'image/png',
			'image/webp',
			'image/svg+xml',
			'image/gif',
			'video/mp4',
			'video/webm',
		],
		staticDir: 'data/post-media',
	},

	fields: [],
} satisfies CollectionConfig
