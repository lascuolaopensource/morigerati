import { getDb } from '@/modules/utils/server'

import { seedArticoli } from './articoli/articoli.seed'
import { seedHome } from './home/home.seed'
import { clearCollection } from './utils'

//

async function main() {
	await seedHome()
}

await main()

async function main2() {
	const payload = await getDb()
	await clearCollection(payload, 'articoli')
	await seedArticoli()
}
