import path from 'node:path'

import { getPaths } from '@/modules/utils/node'
import { getDb } from '@/modules/utils/server'

import { createMediaFromDirectory } from '../utils'
import mobilita from './mobilita.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedMobilitaSostenibile() {
	const payload = await getDb()

	const cover = await payload.create({
		collection: 'media',
		data: {
			alt: 'Copertina',
		},
		filePath: path.resolve(dirname, 'bici-sostenibilita-copertina.JPG'),
	})

	const galleryDir = path.resolve(dirname, 'gallery')
	const gallery = await createMediaFromDirectory(payload, galleryDir)

	await payload.updateGlobal({
		slug: 'mobilita-sostenibile',
		data: {
			// @ts-expect-error - Slight type mismatch
			description: mobilita.testo.it,
			copertina: cover.id,
			gallery: gallery.map((m) => m.id),
		},
	})
}
