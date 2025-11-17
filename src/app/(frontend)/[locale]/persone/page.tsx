import { CollectionGridPage } from '@/modules/components/collection-grid-page'

//

export const dynamic = 'force-dynamic'

export default async function Page() {
	return <CollectionGridPage collection="persone" />
}
