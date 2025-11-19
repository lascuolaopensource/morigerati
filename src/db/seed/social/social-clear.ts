import { CollectionSlug } from 'payload'

import { getDb } from '@/modules/utils/server'

//

export async function clearSocial() {
	const payload = await getDb()
	const socialCollections: CollectionSlug[] = ['social-media', 'social-account', 'social-post']

	for (const collection of socialCollections) {
		await payload.db.deleteMany({ collection, where: {} })
	}

	payload.logger.info('Social data cleared successfully!')
}

await clearSocial()
