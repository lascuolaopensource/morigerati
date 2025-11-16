import type { CollectionConfig } from 'payload'

import { CollectionGroup, videoMimeTypes } from '../utils'

//

export const Video: CollectionConfig = {
	slug: 'video',

	labels: {
		singular: 'Video',
		plural: 'Video',
	},

	admin: {
		group: CollectionGroup.Multimedia,
	},

	access: {
		read: () => true,
	},

	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
			localized: true,
		},
	],

	upload: {
		mimeTypes: videoMimeTypes,
		staticDir: 'data/video',
	},
}
