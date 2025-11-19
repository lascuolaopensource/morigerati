import { getDb } from '#/utils/server'
import { getLocale } from 'next-intl/server'

import { SimplePage } from '@/modules/components/simple-page'
import { generateGlobalMetadataFactory } from '@/modules/seo'

//

export const dynamic = 'force-dynamic'

export const generateMetadata = generateGlobalMetadataFactory('chi-siamo')

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
