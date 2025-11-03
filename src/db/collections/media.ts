import type { CollectionConfig } from 'payload'

import { CollectionGroup, imageSizes } from '../utils'

//

export const Media: CollectionConfig = {
	slug: 'media',
	labels: {
		singular: 'Immagine',
		plural: 'Immagini',
	},
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
		mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
		adminThumbnail: 'thumbnail',
		formatOptions: { format: 'webp' },
		imageSizes,
		staticDir: 'data/media',
	},
}
