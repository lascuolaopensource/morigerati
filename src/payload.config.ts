import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { it } from '@payloadcms/translations/languages/it'
import { hasLocale, localization } from '#/i18n'
import { Locale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Articoli } from '@/db/collections/articoli'
import { Itinerari } from '@/db/collections/itinerari'
import { Luoghi } from '@/db/collections/luoghi'
import { Media } from '@/db/collections/media'
import { Persone } from '@/db/collections/persone'
import { Residenze } from '@/db/collections/residenze'
import { Tracciati } from '@/db/collections/tracciati'
import { SocialAccount } from '@/db/collections/transluoghigram/social-account'
import { SocialMedia } from '@/db/collections/transluoghigram/social-media'
import { SocialPost } from '@/db/collections/transluoghigram/social-post'
import { Users } from '@/db/collections/users'
import { Video } from '@/db/collections/video'
import { ChiSiamo } from '@/db/globals/chi-siamo'
import { Footer } from '@/db/globals/footer'
import { Home } from '@/db/globals/home'
import { MobilitaSostenibile } from '@/db/globals/mobilita-sostenibile'
import { Testi } from '@/db/globals/testi'

import type * as T from './payload-types'

import { getPaths } from './modules/utils/node'
import {
	createLexicalToTxtConverter,
	createTruncatedConverter,
} from './modules/utils/server-lexical'

//

const { dirname } = getPaths(import.meta.url)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},

	collections: [
		Users,
		Media,
		Video,
		Tracciati,
		Itinerari,
		Luoghi,
		Persone,
		Residenze,
		Articoli,
		SocialPost,
		SocialMedia,
		SocialAccount,
	],
	globals: [Home, Testi, Footer, ChiSiamo, MobilitaSostenibile],

	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || '',
	}),
	sharp,
	plugins: [s3(), seo()],
	localization: localization,
	i18n: {
		fallbackLanguage: 'it',
		supportedLanguages: {
			it: it,
		},
	},
})

//

function s3() {
	return s3Storage({
		disableLocalStorage: true,
		collections: {
			[Media.slug]: true,
			[Tracciati.slug]: true,
			[Video.slug]: true,
			[SocialMedia.slug]: true,
		},
		bucket: process.env.S3_BUCKET!,
		enabled: true,
		config: {
			endpoint: process.env.S3_ENDPOINT!,
			region: process.env.S3_REGION!,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID!,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
			},
			forcePathStyle: true,
		},
	})
}

function seo() {
	return seoPlugin({
		collections: ['articoli', 'itinerari', 'luoghi', 'residenze', 'persone'],
		globals: ['home', 'chi-siamo', 'mobilita-sostenibile'],
		uploadsCollection: 'media',
		tabbedUI: true,

		generateImage: async ({ doc, collectionSlug, globalSlug, req }) => {
			let image: string | number | { id: string | number } | undefined | null = null
			if (collectionSlug === 'articoli') {
				image = (doc as T.Articoli).copertina
			} else if (collectionSlug === 'itinerari') {
				image = (doc as T.Itinerari).copertina
			} else if (collectionSlug === 'luoghi') {
				image = (doc as T.Luoghi).copertina
			} else if (collectionSlug === 'residenze') {
				image = (doc as T.Residenze).copertina
			} else if (collectionSlug === 'persone') {
				image = (doc as T.Persone).copertina
			} else if (globalSlug === 'home') {
				image = (doc as T.Home).cover
			} else if (globalSlug === 'chi-siamo') {
				image = (doc as T.ChiSiamo).copertina
			} else if (globalSlug === 'mobilita-sostenibile') {
				image = (doc as T.MobilitaSostenibile).copertina
			}

			if (image) {
				return image
			} else {
				const home = await req.payload.findGlobal({
					slug: 'home',
				})
				return home.cover
			}
		},

		generateTitle: async ({ doc, collectionSlug, globalSlug, req }) => {
			const payloadLocale = req.locale
			let locale: Locale = 'it'
			if (payloadLocale && hasLocale(payloadLocale)) locale = payloadLocale
			const m = await getMessages({ locale })

			let title: string | undefined = undefined
			if (collectionSlug === 'articoli') {
				title = `${m.navigation.articles} – ${(doc as T.Articoli).name}`
			} else if (collectionSlug === 'itinerari') {
				title = `${m.navigation.itineraries} – ${(doc as T.Itinerari).name}`
			} else if (collectionSlug === 'luoghi') {
				title = `${m.navigation.places} – ${(doc as T.Luoghi).name}`
			} else if (collectionSlug === 'residenze') {
				title = `${m.navigation.residences} – ${(doc as T.Residenze).name}`
			} else if (collectionSlug === 'persone') {
				title = `${m.navigation.persone} – ${(doc as T.Persone).name}`
			} else if (globalSlug === 'home') {
				title = m.navigation.home
			} else if (globalSlug === 'chi-siamo') {
				title = m.navigation.about
			} else if (globalSlug === 'mobilita-sostenibile') {
				title = m.navigation.mobility
			}

			if (title) {
				return `Transluoghi – ${title}`
			} else {
				return 'Transluoghi'
			}
		},

		generateURL: async ({ doc, collectionSlug, globalSlug, req }) => {
			let path: string | undefined = undefined
			if (collectionSlug === 'articoli') {
				path = `articoli/${(doc as T.Articoli).name}`
			} else if (collectionSlug === 'itinerari') {
				path = `itinerari/${(doc as T.Itinerari).name}`
			} else if (collectionSlug === 'luoghi') {
				path = `luoghi/${(doc as T.Luoghi).name}`
			} else if (collectionSlug === 'residenze') {
				path = `residenze/${(doc as T.Residenze).name}`
			} else if (collectionSlug === 'persone') {
				path = `persone/${(doc as T.Persone).name}`
			} else if (globalSlug === 'home') {
				path = `home`
			} else if (globalSlug === 'chi-siamo') {
				path = `chi-siamo`
			} else if (globalSlug === 'mobilita-sostenibile') {
				path = `mobilita-sostenibile`
			}

			const payloadLocale = req.locale
			let locale: Locale = 'it'
			if (payloadLocale && hasLocale(payloadLocale)) locale = payloadLocale

			return `${process.env.NEXT_PUBLIC_URL}/${locale}/${path}`
		},

		generateDescription: async ({ doc, collectionSlug, globalSlug }) => {
			const converter = await createLexicalToTxtConverter()
			const tc = createTruncatedConverter(converter, 150)

			let desc: string | undefined | null = undefined
			if (collectionSlug === 'articoli') {
				desc = tc((doc as T.Articoli).contents)
			} else if (collectionSlug === 'itinerari') {
				desc = tc((doc as T.Itinerari).description)
			} else if (collectionSlug === 'luoghi') {
				desc = tc((doc as T.Luoghi).description)
			} else if (collectionSlug === 'residenze') {
				desc = (doc as T.Residenze).short_description
			} else if (collectionSlug === 'persone') {
				desc = tc((doc as T.Persone).description)
			} else if (globalSlug === 'home') {
				desc = (doc as T.Home).statement
			} else if (globalSlug === 'chi-siamo') {
				desc = tc((doc as T.ChiSiamo).description)
			} else if (globalSlug === 'mobilita-sostenibile') {
				desc = tc((doc as T.MobilitaSostenibile).description)
			}

			if (desc) {
				return desc
			} else {
				return 'Ecomuseo del Bussento Contemporaneo'
			}
		},
	})
}
