import { existsSync } from 'node:fs'
import path from 'node:path'

import { getDb, getPaths } from '@/modules/utils/server'
import { Media } from '@/payload-types'

import { createMediaFromDirectory } from '../utils'
import luoghi from './luoghi.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedLuoghi() {
	const payload = await getDb()

	for (const luogo of luoghi) {
		const createdLuogo = await payload.create({
			collection: 'luoghi',
			data: {
				name: luogo.nome,
				slug: luogo.slug,
				// @ts-expect-error - Slight type mismatch
				description: luogo.testo.it,
				coordinates: luogo.posizione.coordinates as [number, number],
				contacts: luogo.contatti.map((c) => ({
					name: c.nome,
					telefono: c.telefono,
				})),
				// @ts-expect-error - Slight type mismatch
				services: luogo.servizi.map((s) => ({
					description: s.testo.it,
					name: s.nome.it,
				})),
				// @ts-expect-error - Slight type mismatch
				timetable: luogo.orari.it,
			},
		})

		const luogoId = createdLuogo.id

		// Find matching media folder
		const mediaFolderPath = path.resolve(dirname, 'luoghi-media', luogo.slug)
		if (!existsSync(mediaFolderPath))
			throw new Error(`Media folder not found for luogo ${luogo.nome}`)

		// Create copertina from root directory
		const copertina = await createMediaFromDirectory(payload, mediaFolderPath)

		// Create media from galleria subdirectory if it exists
		const gallery: Media[] = []
		const galleriaPath = path.resolve(mediaFolderPath, 'galleria')
		if (!existsSync(galleriaPath)) throw new Error(`Galleria not found: ${luogo.nome}`)
		const galleriaMedia = await createMediaFromDirectory(payload, galleriaPath)
		gallery.push(...galleriaMedia)

		await payload.update({
			collection: 'luoghi',
			id: luogoId,
			data: {
				gallery: gallery.map((media) => media.id),
				copertina: copertina.at(0)?.id,
			},
		})
	}
}
