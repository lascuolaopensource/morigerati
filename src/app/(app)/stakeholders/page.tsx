import React, { Suspense } from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'

import ColorCardWrapper from '@/components/colorCardWrapper'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  Stakeholders: {
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

const StakeholdersPage = async () => {
  let collectionStakeholders = null
  let stakeholdersTesto = null

  try {
    const [collectionData, globalData] = await Promise.all([
      findCollection({ collection: 'stakeholders' }),
      findGlobals({ slug: 'testi' }) as unknown as Promise<GlobalTesti>,
    ])

    collectionStakeholders = collectionData

    stakeholdersTesto = globalData.Stakeholders.testo.root.children[0].children[0].text
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-stakeholderColor" currentPage="/stakeholders" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-bold text-[40px]">Stakeholders</h1>
        {stakeholdersTesto ? (
          <p className="font-normal text-sm pt-4 pb-4 leading-4">{stakeholdersTesto}</p>
        ) : (
          <p>Error loading Luoghi text data</p>
        )}

        <Suspense fallback={<div>Loading Luogo component...</div>}>
          <ColorCardWrapper
            color="bg-stakeholderColor"
            jsonString={JSON.stringify(collectionStakeholders)}
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default StakeholdersPage
