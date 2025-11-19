import { getDb } from '#/utils/server'
import { getLocale } from 'next-intl/server'

import { SimplePage } from '@/modules/components/simple-page'
import { generateGlobalMetadataFactory } from '@/modules/seo'

//

export const dynamic = 'force-dynamic'

export const generateMetadata = generateGlobalMetadataFactory('mobilita-sostenibile')

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
