import type { CollectionConfig } from 'payload'

import { CollectionGroup, imageMimeTypes, imageSizes } from '../utils'

//

export const Media: CollectionConfig = {
	slug: 'media',

	labels: {
		singular: 'Immagine',
		plural: 'Immagini',
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
		mimeTypes: imageMimeTypes,
		adminThumbnail: 'thumbnail',
		formatOptions: { format: 'webp' },
		imageSizes,
		staticDir: 'data/media',
	},
}
