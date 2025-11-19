import type { Metadata } from 'next'

import { brandText } from '../brand/text'
import { getServerSideURL } from './get-url'

//

export const defaultOpenGraph = {
	type: 'website',
	description: brandText.subtitle,
	images: [
		{
			url: `${getServerSideURL()}/transluoghi-og.webp`,
		},
	],
	siteName: brandText.title,
	title: brandText.title,
} satisfies Metadata['openGraph']

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	}
}
