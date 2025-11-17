import { MainCollection, MainCollectionRecord } from '@/modules/brand'
import { CollectionCard } from '@/modules/components/collection-card'

type Props = {
	collection: MainCollection
	records: MainCollectionRecord[]
}

export function RecordsDisplay(props: Props) {
	const { collection, records } = props

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{records.map((record) => (
				<CollectionCard key={record.id} collection={collection} record={record} />
			))}
		</div>
	)
}
