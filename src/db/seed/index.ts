'use server'

import { getDb } from '@/modules/utils/server'

import { seedArticoli } from './articoli/articoli.seed'
import { seedChiSiamo } from './chi-siamo/chi-siamo.seed'
import { seedFooter } from './footer/footer.seed'
import { seedHome } from './home/home.seed'
import { seedItinerari } from './itinerari/itinerari.seed'
import { seedLuoghi } from './luoghi/luoghi.seed'
import { seedMobilitaSostenibile } from './mobilita-sostenibile/mobilita.seed'
import { seedPersone } from './persone/persone.seed'
import { seedResidenze } from './residenze/residenze.seed'
import { seedTesti } from './testi/testi.seed'
import { clearCollection } from './utils'

//

export async function clearData() {
	const payload = await getDb()

	payload.logger.info('Clearing seed data...')

	// Clear all collections except users
	for (const collection of payload.config.collections) {
		if (collection.slug === 'users') continue
		await clearCollection(payload, collection.slug)
	}

	payload.logger.info('Data cleared successfully!')
}

//

export async function seedData() {
	const payload = await getDb()

	payload.logger.info('Starting seed operation...')

	try {
		await seedTesti()
		await seedFooter()
		await seedMobilitaSostenibile()
		await seedChiSiamo()
		await seedLuoghi()
		await seedResidenze()
		await seedPersone()
		await seedItinerari()
		await seedArticoli()
		await seedHome()
	} catch (error) {
		payload.logger.error('Error during seed: ' + JSON.stringify(error))
		throw error
	}

	payload.logger.info('Seed completed successfully!')
}
