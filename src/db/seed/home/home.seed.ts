import path from 'node:path'

import { getPaths } from '@/modules/utils/node'
import { getDb } from '@/modules/utils/server'

import home from './home.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedHome() {
	const payload = await getDb()

	try {
		const cover = await payload.create({
			collection: 'media',
			data: {
				alt: 'Copertina',
			},
			filePath: path.resolve(dirname, 'cover.webp'),
		})

		const luoghi = await payload.find({
			collection: 'luoghi',
			limit: 2,
		})

		const residenze = await payload.find({
			collection: 'residenze',
			limit: 2,
		})

		await payload.updateGlobal({
			slug: 'home',
			data: {
				statement: home.statement.it,
				// @ts-expect-error - Slight type mismatch
				introduzione: home.testo.it,
				cover: cover.id,
				sections: {
					itinerari: {
						title: home.itinerari.title.it,
						// @ts-expect-error - Slight type mismatch
						description: home.itinerari.testo.it,
					},
					luoghi: {
						title: home.luoghi.title.it,
						// @ts-expect-error - Slight type mismatch
						description: home.luoghi.testo.it,
						items: luoghi.docs.map((luogo) => luogo.id),
					},
					residenze: {
						title: home.residenze.title.it,
						// @ts-expect-error - Slight type mismatch
						description: home.residenze.testo.it,
						items: residenze.docs.map((residenza) => residenza.id),
					},
				},
			},
		})
	} catch (e) {
		console.log(e)
	}
}
