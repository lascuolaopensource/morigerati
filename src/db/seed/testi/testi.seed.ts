import { capitalizeFirstLetter } from '@/modules/utils'
import { getDb } from '@/modules/utils/server'

import home from './testi.json'

//

export async function seedTesti() {
	const payload = await getDb()

	await payload.updateGlobal({
		slug: 'testi',
		data: {
			articoli: {
				title: capitalizeFirstLetter(home.articoli.title.it.toLowerCase()),
				// @ts-expect-error - Slight type mismatch
				description: home.articoli.testo.it,
			},
			itinerari: {
				title: capitalizeFirstLetter(home.itinerari.title.it.toLowerCase()),
				// @ts-expect-error - Slight type mismatch
				description: home.itinerari.testo.it,
			},
			residenze: {
				title: capitalizeFirstLetter(home.residenze.title.it.toLowerCase()),
				// @ts-expect-error - Slight type mismatch
				description: home.residenze.testo.it,
			},
			persone: {
				title: capitalizeFirstLetter(home.persone.title.it.toLowerCase()),
				// @ts-expect-error - Slight type mismatch
				description: home.persone.testo.it,
			},
			luoghi: {
				title: capitalizeFirstLetter(home.luoghi.title.it.toLowerCase()),
				// @ts-expect-error - Slight type mismatch
				description: home.luoghi.testo.it,
			},
		},
	})
}
