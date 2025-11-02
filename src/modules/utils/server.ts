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

export function getRecord<T>(data: T | number): T {
	if (typeof data === 'number') {
		throw new Error('Data is a number')
	}
	return data
}

export function getRecords<T>(data: (number | T)[] | null | undefined): T[] {
	return data?.map(getRecord) ?? []
}
