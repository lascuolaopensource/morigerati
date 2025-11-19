import {
	GenerateDescription,
	GenerateImage,
	GenerateTitle,
	GenerateURL,
} from '@payloadcms/plugin-seo/types'
import { Locale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import {
	Articoli,
	ChiSiamo,
	Home,
	Itinerari,
	Luoghi,
	MobilitaSostenibile,
	Persone,
	Residenze,
} from '@/payload-types'

import { brandText } from '../brand/text'
import { hasLocale } from '../i18n'
import { createLexicalToTxtConverter, createTruncatedConverter } from '../utils/server-lexical'

//

type RootGenerateFn = GenerateImage | GenerateDescription | GenerateTitle | GenerateURL

type GenerateFnReturn<F extends RootGenerateFn> = Promise<Awaited<ReturnType<F>>>

type GenerateFnArgs = {
	doc: unknown
	collectionSlug: CollectionSlug | undefined
	globalSlug: GlobalSlug | undefined
	payload: Payload
	locale: PayloadRequest['locale']
}

//

export async function generateImage(args: GenerateFnArgs): GenerateFnReturn<GenerateImage> {
	const { doc, collectionSlug, globalSlug, payload } = args
	let image: string | number | { id: string | number } | undefined | null = null
	if (collectionSlug === 'articoli') {
		image = (doc as Articoli).copertina
	} else if (collectionSlug === 'itinerari') {
		image = (doc as Itinerari).copertina
	} else if (collectionSlug === 'luoghi') {
		image = (doc as Luoghi).copertina
	} else if (collectionSlug === 'residenze') {
		image = (doc as Residenze).copertina
	} else if (collectionSlug === 'persone') {
		image = (doc as Persone).copertina
	} else if (globalSlug === 'home') {
		image = (doc as Home).cover
	} else if (globalSlug === 'chi-siamo') {
		image = (doc as ChiSiamo).copertina
	} else if (globalSlug === 'mobilita-sostenibile') {
		image = (doc as MobilitaSostenibile).copertina
	}

	if (image) {
		return image
	} else {
		const home = await payload.findGlobal({
			slug: 'home',
		})
		return home.cover
	}
}

//

export async function generateTitle(args: GenerateFnArgs): GenerateFnReturn<GenerateTitle> {
	const { doc, collectionSlug, globalSlug, locale: payloadLocale } = args

	let locale: Locale = 'it'
	if (payloadLocale && hasLocale(payloadLocale)) locale = payloadLocale
	const m = await getMessages({ locale })

	let title: string | undefined = undefined
	if (collectionSlug === 'articoli') {
		title = `${m.navigation.articles} – ${(doc as Articoli).name}`
	} else if (collectionSlug === 'itinerari') {
		title = `${m.navigation.itineraries} – ${(doc as Itinerari).name}`
	} else if (collectionSlug === 'luoghi') {
		title = `${m.navigation.places} – ${(doc as Luoghi).name}`
	} else if (collectionSlug === 'residenze') {
		title = `${m.navigation.residences} – ${(doc as Residenze).name}`
	} else if (collectionSlug === 'persone') {
		title = `${m.navigation.persone} – ${(doc as Persone).name}`
	} else if (globalSlug === 'home') {
		title = m.navigation.home
	} else if (globalSlug === 'chi-siamo') {
		title = m.navigation.about
	} else if (globalSlug === 'mobilita-sostenibile') {
		title = m.navigation.mobility
	}

	if (title) {
		return `${brandText.title} – ${title}`
	} else {
		return brandText.title
	}
}

//

export async function generateUrl(args: GenerateFnArgs): GenerateFnReturn<GenerateURL> {
	const { doc, collectionSlug, globalSlug, locale: payloadLocale } = args

	let path: string | undefined = undefined

	if (collectionSlug === 'articoli') {
		path = `articoli/${(doc as Articoli).name}`
	} else if (collectionSlug === 'itinerari') {
		path = `itinerari/${(doc as Itinerari).name}`
	} else if (collectionSlug === 'luoghi') {
		path = `luoghi/${(doc as Luoghi).name}`
	} else if (collectionSlug === 'residenze') {
		path = `residenze/${(doc as Residenze).name}`
	} else if (collectionSlug === 'persone') {
		path = `persone/${(doc as Persone).name}`
	} else if (globalSlug === 'home') {
		path = `home`
	} else if (globalSlug === 'chi-siamo') {
		path = `chi-siamo`
	} else if (globalSlug === 'mobilita-sostenibile') {
		path = `mobilita-sostenibile`
	}

	let locale: Locale = 'it'
	if (payloadLocale && hasLocale(payloadLocale)) locale = payloadLocale

	let base = `${process.env.NEXT_PUBLIC_URL}/${locale}`
	if (path) {
		base = `${base}/${path}`
	}
	return base
}

//

export async function generateDescription(
	args: GenerateFnArgs,
): GenerateFnReturn<GenerateDescription> {
	const { doc, collectionSlug, globalSlug } = args

	const converter = await createLexicalToTxtConverter()
	const tc = createTruncatedConverter(converter, 150)

	let desc: string | undefined | null = undefined
	if (collectionSlug === 'articoli') {
		desc = tc((doc as Articoli).contents)
	} else if (collectionSlug === 'itinerari') {
		desc = tc((doc as Itinerari).description)
	} else if (collectionSlug === 'luoghi') {
		desc = tc((doc as Luoghi).description)
	} else if (collectionSlug === 'residenze') {
		desc = (doc as Residenze).short_description
	} else if (collectionSlug === 'persone') {
		desc = tc((doc as Persone).description)
	} else if (globalSlug === 'home') {
		desc = (doc as Home).statement
	} else if (globalSlug === 'chi-siamo') {
		desc = tc((doc as ChiSiamo).description)
	} else if (globalSlug === 'mobilita-sostenibile') {
		desc = tc((doc as MobilitaSostenibile).description)
	}

	if (desc) {
		return desc
	} else {
		return brandText.subtitle
	}
}
