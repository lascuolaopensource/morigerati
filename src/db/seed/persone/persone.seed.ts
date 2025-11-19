import path from 'node:path'

import { getPaths } from '@/modules/utils/node'
import { getDb } from '@/modules/utils/server'

import { createMediaFromDirectory } from '../utils'
import persone from './persone.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedPersone() {
	const payload = await getDb()

	for (const persona of persone) {
		const copertina = await createMediaFromDirectory(payload, path.resolve(dirname, persona.slug))

		const gallery = await createMediaFromDirectory(
			payload,
			path.resolve(dirname, persona.slug, 'galleria'),
		)

		await payload.create({
			collection: 'persone',
			data: {
				name: persona.nome,
				slug: persona.slug,
				// @ts-expect-error - Slight type mismatch
				description: persona.testo.it,
				coordinates: persona.posizione.coordinates as [number, number],
				contacts: persona.contatti.map((c) => ({
					name: c.nome,
				})),
				address: persona.indirizzo,
				copertina: copertina.at(0)?.id,
				gallery: gallery.map((media) => media.id),
			},
		})
	}
}
