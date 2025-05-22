import { Luoghi, Residenze, Persone, Itinerari, Media } from '@/payload-types'
import Card from '../card/card'
import { Collections } from '@/db/collections'
import { loadDb } from '@/utils/db'
import { getLocale } from '@/utils/i18n'
import { MainCollections } from '@/utils/types'
type CardItem = Luoghi | Persone | Itinerari | Residenze

type Props = {
  collection: MainCollections
}

export async function CollectionGrid(props: Props) {
  const { collection } = props

  const db = await loadDb()
  const locale = await getLocale()

  const query = await db.find({
    collection: props.collection,
    locale,
    sort: 'nome',
  })

  const items = query.docs as CardItem[]

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
