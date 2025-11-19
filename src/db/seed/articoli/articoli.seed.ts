import path from 'node:path'

import { getPaths } from '@/modules/utils/node'
import { getDb } from '@/modules/utils/server'
import { Articoli } from '@/payload-types'

import { createMediaFromDirectory } from '../utils'
import articoli from './articoli.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedArticoli() {
	const payload = await getDb()

	for (const articolo of articoli) {
		const copertina = await createMediaFromDirectory(payload, path.resolve(dirname, articolo.slug))

		const data: Articoli = {
			name: articolo.titolo.it,
			slug: articolo.slug,
			// @ts-expect-error - Slight type mismatch
			contents: articolo.testo.it,
			subtitle: articolo.sottotitolo?.it,
			date: articolo.data_pubblicazione,
			tag: 'comunicato-stampa',
			copertina: copertina.at(0)?.id,
		}

		await payload.create({
			collection: 'articoli',
			data,
		})
	}
}
