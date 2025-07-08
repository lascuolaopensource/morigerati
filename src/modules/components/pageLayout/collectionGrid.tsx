import { Media } from '@/payload-types'
import Card from '../card/card'
import { MainCollectionRecord, MainCollections } from '#/types'

//

type Props = {
  collection: MainCollections
  items: MainCollectionRecord[]
}

export async function CollectionGrid(props: Props) {
  const { collection, items } = props

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} record={item} category={collection} />
      ))}
    </div>
  )
}
