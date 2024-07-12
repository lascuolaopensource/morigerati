import React, { Suspense } from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'
import ColorCardWrapper from '@/components/colorCardWrapper'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import renderElement, { RootNode } from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  Luoghi: {
    testo: {
      root: RootNode
    }
  }
}

const LuoghiPage = async () => {
  let collectionLuoghi = null
  let luoghiTesto: RootNode['children'] | null = null

  try {
    const [collectionData, globalData] = await Promise.all([
      findCollection({ collection: 'luoghi' }),
      findGlobals({ slug: 'testi' }) as unknown as Promise<GlobalTesti>,
    ])
    collectionLuoghi = collectionData
    luoghiTesto = globalData.Luoghi.testo.root.children
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-luogoColor" currentPage="/luoghi" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-bold text-[40px]">Luoghi</h1>
        {luoghiTesto ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            {renderElement([{ children: luoghiTesto }])}
          </div>
        ) : (
          <p>Error loading Luoghi text data</p>
        )}
        <Suspense fallback={<div>Loading Luogo component...</div>}>
          <ColorCardWrapper color="bg-luogoColor" jsonString={JSON.stringify(collectionLuoghi)} />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default LuoghiPage
