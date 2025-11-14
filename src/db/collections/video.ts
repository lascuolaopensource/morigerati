import type { CollectionConfig } from 'payload'

import { CollectionGroup } from '../utils'

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
		mimeTypes: ['video/mp4', 'video/webm', 'video/ogg'],
		staticDir: 'data/video',
	},
}
