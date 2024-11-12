import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import StringToHTML from '../serializer/stringToHTML'
import MySwiper from './wrappers/cardsSwiper'
import { Stakeholder } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface cardsPageProps {
  collectionQuery: 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'
  cardTitlePosition?: 'top' | 'bottom'
}

const CardsPage: React.FC<cardsPageProps> = async ({ collectionQuery, cardTitlePosition }) => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })
  const doc = await db.find({
    collection: collectionQuery,
    depth: 2,
  })

  const docs = doc.docs

  return (
    <main>
      <div className="bg-white p-3 max-w-screen-xl mx-auto">
        {testi[collectionQuery].title ? (
          <div className="font-normal text-sm leading-4">
            <h1 className="font-bold sm:text-center text-[40px]">{testi[collectionQuery].title}</h1>
          </div>
        ) : (
          <p></p>
        )}
        <StringToHTML htmlString={testi[collectionQuery].text_html ?? ''} />

        <Suspense>
          <MySwiper items={docs} category={collectionQuery} cardTitlePosition={cardTitlePosition} />
        </Suspense>
      </div>
    </main>
  )
}

export default CardsPage
