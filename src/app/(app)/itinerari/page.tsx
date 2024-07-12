import React, { Suspense } from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'
import ColorCardWrapper from '@/components/colorCardWrapper'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import renderElement, { RootNode } from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  Itinerari: {
    testo: {
      root: RootNode
    }
  }
}

const ItinerariPage = async () => {
  let collectionItinerari = null
  let itinerariTesto: RootNode['children'] | null = null

  try {
    const [collectionData, globalData] = await Promise.all([
      findCollection({ collection: 'itinerari' }),
      findGlobals({ slug: 'testi' }) as unknown as Promise<GlobalTesti>,
    ])
    collectionItinerari = collectionData
    itinerariTesto = globalData.Itinerari.testo.root.children
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-itinerarioColor" currentPage="/itinerari" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-bold text-[40px]">Itinerari</h1>
        {itinerariTesto ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            {renderElement([{ children: itinerariTesto }])}
          </div>
        ) : (
          <p>Error loading Itinerari text data</p>
        )}
        <Suspense fallback={<div>Loading Itinerari component...</div>}>
          <ColorCardWrapper
            color="bg-itinerarioColor"
            jsonString={JSON.stringify(collectionItinerari)}
            previous="itinerari"
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default ItinerariPage
