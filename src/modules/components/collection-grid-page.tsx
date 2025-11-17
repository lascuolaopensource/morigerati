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

	const records = await db.find({
		collection: props.collection,
		locale,
		sort: 'name',
		limit: 100,
	})

	return (
		<>
			<CollectionHeading collection={props.collection} />

			<Container className="py-12">
				<CollectionGrid collection={props.collection} items={records.docs} />
			</Container>
		</>
	)
}
