import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getDb } from '@/modules/utils/server'

import home from './home.json'

//

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
					},
					residenze: {
						title: home.residenze.title.it,
						// @ts-expect-error - Slight type mismatch
						description: home.residenze.testo.it,
					},
				},
			},
		})
	} catch (e) {
		console.log(e)
	}
}
