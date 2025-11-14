import { getDb } from '@/modules/utils/server'

import chisiamo from './chi-siamo.json'

//

export async function seedChiSiamo() {
	const payload = await getDb()

	await payload.updateGlobal({
		slug: 'chi-siamo',
		data: {
			// @ts-expect-error - Slight type mismatch
			description: chisiamo.testo_chi_siamo.it,
		},
	})
}
