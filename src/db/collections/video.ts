import type { CollectionConfig } from 'payload'

import { CollectionGroup } from '../utils'

//

export const Video: CollectionConfig = {
	slug: 'video',
	access: {
		read: () => true,
	},
	admin: {
		group: CollectionGroup.Multimedia,
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
