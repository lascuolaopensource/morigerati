import config from '@payload-config'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import {
	CollectionSlug,
	DataFromCollectionSlug,
	getPayload,
	PaginatedDocs,
	type Payload,
} from 'payload'

//

export async function getDb(): Promise<Payload> {
	return getPayload({ config }) as Promise<Payload>
}

export function getOne<Docs extends PaginatedDocs>(docs: Docs): Docs['docs'][number] {
	const doc = docs.docs[0]
	if (!doc) return notFound()
	return doc
}

export interface PageProps {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

//

export interface PageWithSlugProps {
	params: Promise<{
		slug: string
	}>
}

export async function getSlug(pageProps: PageWithSlugProps): Promise<string> {
	return (await pageProps.params).slug
}

//

type GetBySlugResult<C extends CollectionSlug> = {
	record: DataFromCollectionSlug<C>
	db: Payload
	locale: string
}

export async function getRecordBySlug<C extends CollectionSlug>(
	collection: C,
	slug: string,
): Promise<GetBySlugResult<C>> {
	const db = await getDb()
	const locale = await getLocale()

	const result = await db.find({
		collection,
		depth: 2,
		locale,
		where: { slug: { equals: slug } },
	})

	const record = getOne(result)

	return {
		record,
		db,
		locale,
	}
}
