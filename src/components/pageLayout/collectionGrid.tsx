import { Luoghi, Residenze, Persone, Itinerari, Media } from '@/payload-types'
import Card from '../card/card'
import { MainCollections } from '@/utils/types'

//

export type CardItem = Luoghi | Persone | Itinerari | Residenze

type Props = {
  collection: MainCollections
  items: CardItem[]
}

export async function CollectionGrid(props: Props) {
  const { collection, items } = props

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          title={item.nome}
          media={item.copertina as Media}
          slugUrl={`/${collection}/${item.slug}`}
          category={collection}
        />
      ))}
    </div>
  )
}
