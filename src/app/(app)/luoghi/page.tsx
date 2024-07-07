import React, { Suspense } from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'

import Luogo from '@/app/components/luogo'

import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  Luoghi: {
    testo: {
      root: {
        children: Array<{
          children: Array<{
            text: string
          }>
        }>
      }
    }
  }
}

const LuoghiPage = async () => {
  let collectionLuoghi = null
  let luoghiTesto = null

  try {
    const [collectionData, globalData] = await Promise.all([
      findCollection({ collection: 'stakeholders' }),
      findGlobals({ slug: 'testi' }) as unknown as Promise<GlobalTesti>,
    ])

    collectionLuoghi = collectionData

    luoghiTesto = globalData.Luoghi.testo.root.children[0].children[0].text
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-luogoColor" currentPage="/luoghi" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-bold text-[40px]">Luoghi</h1>
        {luoghiTesto ? (
          <p className="font-normal text-sm pt-4 pb-4 leading-4">{luoghiTesto}</p>
        ) : (
          <p>Error loading Luoghi text data</p>
        )}
        <Suspense fallback={<div>Loading Luogo component...</div>}>
          <Luogo />
          <Luogo />
          <Luogo />
          <Luogo />
          <Luogo />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default LuoghiPage
