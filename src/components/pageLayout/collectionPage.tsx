import { CollectionHeading } from '@/components/pageLayout/collectionHeading'
import { Collections } from '@/db/collections'
import { loadDb } from '@/utils/db'
import { CardItem, CollectionGrid } from '@/components/pageLayout/collectionGrid'
import { MainCollections } from '@/utils/types'
import { getLocale } from '@/utils/i18n'

// TODO - Review metadata
// return <CardsPage collectionQuery="luoghi" displayAs="grid" generateSeoMetadata={true} />

type Props = {
  collection: MainCollections
}

export async function CollectionPage(props: Props) {
  const db = await loadDb()
  const locale = await getLocale()

  const testiQuery = await db.findGlobal({
    slug: 'testi',
  })

  const testi = testiQuery[props.collection]
  if (!testi) {
    console.error(`Testi not found for collection ${props.collection}`)
    return null
  }

  const query = await db.find({
    collection: props.collection,
    locale,
    sort: 'nome',
  })

  const items = query.docs as CardItem[]

  return (
    <>
      <CollectionHeading
        collection={props.collection}
        title={testi.title}
        introContent={testi.testo}
      />

      <div className="px-4 md:px-8 py-12 max-w-screen-xl mx-auto">
        <CollectionGrid collection={props.collection} items={items} />
      </div>
    </>
  )
}
