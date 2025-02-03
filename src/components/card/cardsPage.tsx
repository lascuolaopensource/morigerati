import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import StringToHTML from '../serializer/stringToHTML'
import CardGrid from './cardsGrid'
import { RandomLetter } from '../home/randomLetter'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface cardsPageProps {
  collectionQuery: 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'

  displayAs?: 'row' | 'grid'
}

const CardsPage: React.FC<cardsPageProps> = async ({ collectionQuery, displayAs = 'grid' }) => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })
  const home = await db.findGlobal({
    slug: 'home',
  })
  const doc = await db.find({
    collection: collectionQuery,
    depth: 2,
  })

  const docs = doc.docs

  console.log(testi[collectionQuery].text_html == '<p></p>')

  return (
    <main>
      <div className="p-3 max-w-screen-xl mx-auto">
        {testi[collectionQuery].title ? (
          <div className="font-normal text-sm leading-4">
            <h1 className="font-bold sm:text-center text-[40px]">{testi[collectionQuery].title}</h1>
          </div>
        ) : (
          <p></p>
        )}
        <StringToHTML htmlString={testi[collectionQuery].text_html ?? ''} classs="prose-custom" />
        <Suspense>
          <CardGrid
            items={docs}
            category={collectionQuery}
            singleRow={displayAs === 'row'}
            className="mt-6"
          />
        </Suspense>
        <RandomLetter color={collectionQuery} position={'left'} />
      </div>
    </main>
  )
}

export default CardsPage
