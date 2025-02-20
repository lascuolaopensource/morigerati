import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import CardGrid from './cardsGrid'
import { RandomLetter } from '../home/randomLetter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

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
    sort: 'nome',
    depth: 2,
  })

  const docs = doc.docs

  return (
    <main>
      <div className="max-w-screen-xl mx-auto relative w-screen h-[80vh] ">
        {testi[collectionQuery].title ? (
          <div className="font-normal text-sm leading-4">
            <h1 className="font-bold text-center text-[40px]">
              {collectionQuery === 'stakeholders' ? 'Persone' : testi[collectionQuery].title}
            </h1>
          </div>
        ) : (
          <p></p>
        )}
        <div className="flex items-center justify-center">
          <RichText
            data={testi[collectionQuery].testo as SerializedEditorState}
            className="prose prose-lg pl-6 pr-6 "
          />
        </div>
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
