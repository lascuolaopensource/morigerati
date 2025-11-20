import type { CollectionConfig } from 'payload'

import { CollectionGroup, imageMimeTypes, imageSizes, videoMimeTypes } from '../../utils'

//

export const SocialMedia = {
	slug: 'social-media',

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
		mimeTypes: [...imageMimeTypes, ...videoMimeTypes],
		staticDir: 'data/social-media',
	},

	fields: [],
} satisfies CollectionConfig
