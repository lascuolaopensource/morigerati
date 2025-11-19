import { seoPlugin } from '@payloadcms/plugin-seo'

import { generateDescription, generateImage, generateTitle, generateUrl } from './functions'

//

export function seo() {
	return seoPlugin({
		collections: ['articoli', 'itinerari', 'luoghi', 'residenze', 'persone'],
		globals: ['home', 'chi-siamo', 'mobilita-sostenibile'],
		uploadsCollection: 'media',
		tabbedUI: true,

		generateImage: ({ doc, collectionSlug, globalSlug, req }) =>
			generateImage({ doc, collectionSlug, globalSlug, payload: req.payload, locale: req.locale }),

		generateTitle: ({ doc, collectionSlug, globalSlug, req }) =>
			generateTitle({ doc, collectionSlug, globalSlug, payload: req.payload, locale: req.locale }),

		generateURL: ({ doc, collectionSlug, globalSlug, req }) =>
			generateUrl({ doc, collectionSlug, globalSlug, payload: req.payload, locale: req.locale }),

		generateDescription: ({ doc, collectionSlug, globalSlug, req }) =>
			generateDescription({
				doc,
				collectionSlug,
				globalSlug,
				payload: req.payload,
				locale: req.locale,
			}),
	})
}
