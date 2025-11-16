import { getDb } from '#/utils/server'
import { getLocale } from 'next-intl/server'

import { SimplePage } from '@/modules/components/simple-page'

//

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
	const locale = await getLocale()
	const db = await getDb()
	const chiSiamo = await db.findGlobal({
		slug: 'chi-siamo',
		locale,
	})

	return (
		<SimplePage
			cover={chiSiamo.copertina}
			richText={chiSiamo.description}
			gallery={chiSiamo.gallery}
		/>
	)
}
