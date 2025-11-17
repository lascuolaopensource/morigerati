import { getLocale } from 'next-intl/server'

import { MainCollection } from '@/modules/brand'
import { getDb } from '@/modules/utils/server'

import { CollectionGrid } from './collection-grid'
import { CollectionHeading } from './collection-grid-heading'
import { Container } from './container'

//

type Props = {
	collection: MainCollection
}

export async function CollectionGridPage(props: Props) {
	const db = await getDb()
	const locale = await getLocale()

	const testiGlobal = await db.findGlobal({
		slug: 'testi',
	})

	const testi = testiGlobal[props.collection]
	if (!testi) {
		console.error(`Testi not found for collection ${props.collection}`)
		return null
	}

	const records = await db.find({
		collection: props.collection,
		locale,
		sort: 'name',
		limit: 100,
	})

	return (
		<>
			<CollectionHeading
				collection={props.collection}
				title={testi.title}
				description={testi.description}
			/>

			<Container className="py-12">
				<CollectionGrid collection={props.collection} items={records.docs} />
			</Container>
		</>
	)
}
