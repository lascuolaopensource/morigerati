import React, { Suspense } from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'
import Footer from '../../components/footer'
import Luogo from '@/app/components/luogo'

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
      <div className="bg-white p-3 pt-10">
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
