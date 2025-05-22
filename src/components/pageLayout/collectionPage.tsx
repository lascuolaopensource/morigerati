import { CollectionHeading } from '@/components/pageLayout/collectionHeading'
import { Collections } from '@/db/collections'
import { loadDb } from '@/utils/db'
import { CollectionGrid } from '@/components/pageLayout/collectionGrid'
import { MainCollections } from '@/utils/types'

// TODO - Review metadata
// return <CardsPage collectionQuery="luoghi" displayAs="grid" generateSeoMetadata={true} />

type Props = {
  collection: MainCollections
}

export async function CollectionPage(props: Props) {
  const db = await loadDb()

  const testiQuery = await db.findGlobal({
    slug: 'testi',
  })

  const testi = testiQuery[props.collection]
  if (!testi) {
    console.error(`Testi not found for collection ${props.collection}`)
    return null
  }

  return (
    <>
      <CollectionHeading
        collection={props.collection}
        title={testi.title}
        introContent={testi.testo}
      />

      <div className="px-4 md:px-8 py-12 max-w-screen-xl mx-auto">
        <CollectionGrid collection={props.collection} />
      </div>
    </>
  )
}
