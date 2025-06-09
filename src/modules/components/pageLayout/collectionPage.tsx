import { CollectionHeading } from '@/modules/components/pageLayout/collectionHeading'
import { loadDb } from '@/modules/utils/db'
import { CollectionGrid } from '@/modules/components/pageLayout/collectionGrid'
import { MainCollections, MainCollectionRecord } from '@/modules/types'
import { getLocale } from '@/modules/i18n'
import { Container } from '../uiElements/container'

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

  const items = query.docs as MainCollectionRecord[]

  return (
    <>
      <CollectionHeading
        collection={props.collection}
        title={testi.title}
        introContent={testi.testo}
      />

      <Container className="py-12">
        <CollectionGrid collection={props.collection} items={items} />
      </Container>
    </>
  )
}
