import { getDb } from '@/modules/utils/server'

import footer from './footer.json'

//

export async function seedFooter() {
	const payload = await getDb()

	await payload.updateGlobal({
		slug: 'footer',
		data: {
			// @ts-expect-error - Slight type mismatch
			text_left: footer.testo_sinistra.it,
			// @ts-expect-error - Slight type mismatch
			text_right: footer.testo_destra.it,
			social_networks: footer['Link Social'].map((l) => ({
				name: l.nome,
				url: l.link,
			})),
		},
	})
}
