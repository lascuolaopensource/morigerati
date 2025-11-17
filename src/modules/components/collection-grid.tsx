import { MainCollection, MainCollectionRecord } from '@/modules/brand'

import { CollectionCard } from './collection-card'

//

type Props = {
	collection: MainCollection
	items: MainCollectionRecord[]
}

export async function CollectionGrid(props: Props) {
	const { collection, items } = props

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			{items.map((item) => (
				<CollectionCard key={item.id} record={item} collection={collection} />
			))}
		</div>
	)
}
