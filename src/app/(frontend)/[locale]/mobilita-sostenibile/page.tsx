import { getDb } from '#/utils/server'
import { getLocale } from 'next-intl/server'

import { SimplePage } from '@/modules/components/simple-page'

//

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
	const locale = await getLocale()
	const db = await getDb()
	const mobilitaSostenibile = await db.findGlobal({
		slug: 'mobilita-sostenibile',
		locale,
	})

	return (
		<SimplePage
			cover={mobilitaSostenibile.copertina}
			richText={mobilitaSostenibile.description}
			gallery={mobilitaSostenibile.gallery}
		/>
	)
}
