import { getLocale } from 'next-intl/server'

import { Section } from '@/modules/brand'
import { getDb } from '@/modules/utils/server'

interface Props {
	collection: Section & 'itinerari'
}

export async function CollectionPreview(props: Props) {
	const { collection } = props
	const db = await getDb()
	const locale = await getLocale()

	const data = await db.find({
		collection: collection,
		sort: 'nome',
		limit: 2,
		locale,
	})

	return null
}

// {!children && (
// 	<div className="grow grid grid-cols-2 gap-4 px-4 md:px-8">
// 		{data.docs.map((doc) => (
// 			<Card key={doc.id} category={collection} record={doc} />
// 		))}
// 	</div>
// )}

// if (collection === 'residenze') {
// 	data.docs = filterFutureResidenze(data.docs as Residenze[])
// }

// // Filter function to get only future residenze (not yet ended)
// const filterFutureResidenze = (residenze: Residenze[]): Residenze[] => {
// 	const now = new Date()
// 	return residenze.filter((residenza) => {
// 		// Use end date if available, otherwise use start date
// 		const comparisonDate = residenza.data_fine
// 			? new Date(residenza.data_fine)
// 			: residenza.data_inizio
// 				? new Date(residenza.data_inizio)
// 				: null

// 		// If no date is available, keep it
// 		if (!comparisonDate) return true

// 		// Only keep residenze that end in the future
// 		return comparisonDate >= now
// 	})
// }
