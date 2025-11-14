'use server'

import { getDb } from '@/modules/utils/server'

import { seedChiSiamo } from './chi-siamo/chi-siamo.seed'
import { seedFooter } from './footer/footer.seed'
import { seedHome } from './home/home.seed'
import { seedMobilitaSostenibile } from './mobilita-sostenibile/mobilita.seed'
import { seedTesti } from './testi/testi.seed'

//

export async function clearData() {
	const payload = await getDb()

	payload.logger.info('Clearing seed data...')

	// Clear all collections except users
	for (const collection of payload.config.collections) {
		if (collection.slug === 'users') continue
		await payload.db.deleteMany({ collection: collection.slug, where: {} })
	}

	payload.logger.info('Data cleared successfully!')
}

//

export async function seedData() {
	const payload = await getDb()

	payload.logger.info('Starting seed operation...')

	try {
		await seedHome()
		await seedTesti()
		await seedFooter()
		await seedMobilitaSostenibile()
		await seedChiSiamo()
		// // 1. Seed base data (independent entities)
		// payload.logger.info('— Seeding base data...')
		// const { personas, locations, topics, genericForm } = await seedBaseData()
		// // 2. Seed activities (depends on base data)
		// payload.logger.info('— Seeding activities...')
		// const activities = await seedActivities({
		//   personas,
		//   locations,
		//   topics,
		//   form: genericForm,
		// })
		// // 3. Seed videos (depends on activities)
		// payload.logger.info('— Seeding videos...')
		// await seedVideos({ activities })
		// // 4. Seed proposta-attivita form
		// payload.logger.info('— Seeding proposta-attivita form...')
		// await seedPropostaAttivitaForm()
		// // 5. Seed About global
		// payload.logger.info('— Seeding About global...')
		// await seedAbout()
		// payload.logger.info('Seed completed successfully!')
	} catch (error) {
		payload.logger.error('Error during seed: ' + JSON.stringify(error))
		throw error
	}

	payload.logger.info('Seed completed successfully!')
}
