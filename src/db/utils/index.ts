import { ImageSize } from 'payload'

//

export enum CollectionGroup {
	Multimedia = 'Multimedia',
	Contenuti = 'Contenuti',
	Principali = 'Principali',
	Transluoghigram = 'Transluoghigram',
}

//

export const imageSizes: ImageSize[] = [
	{
		name: 'thumbnail',
		width: 300,
		position: 'centre',
		fit: 'inside',
		formatOptions: { format: 'webp', options: { quality: 90 } },
	},
	{
		name: 'small',
		width: 600,
		position: 'centre',
		fit: 'inside',
		formatOptions: { format: 'webp', options: { quality: 90 } },
		withoutEnlargement: true,
	},
	{
		name: 'medium',
		width: 900,
		position: 'centre',
		fit: 'inside',
		formatOptions: { format: 'webp', options: { quality: 90 } },
		withoutEnlargement: true,
	},
	{
		name: 'large',
		width: 1400,
		position: 'centre',
		fit: 'inside',
		formatOptions: { format: 'webp', options: { quality: 90 } },
		withoutEnlargement: true,
	},
	{
		name: 'xlarge',
		width: 1920,
		position: 'centre',
		fit: 'inside',
		formatOptions: { format: 'webp', options: { quality: 90 } },
		withoutEnlargement: true,
	},
	{
		name: 'og',
		width: 1200,
		height: 630,
		crop: 'center',
		position: 'centre',
		fit: 'inside',
		formatOptions: { format: 'webp', options: { quality: 90 } },
		withoutEnlargement: true,
	},
]

//

export const imageMimeTypes = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif',
]

export const videoMimeTypes = ['video/mp4', 'video/webm']
