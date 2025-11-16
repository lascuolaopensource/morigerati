import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload, PaginatedDocs, type Payload } from 'payload'

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
