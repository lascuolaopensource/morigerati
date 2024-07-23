import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import renderContent from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ItinerariPage = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const itinerari = await db.find({
    collection: 'itinerari',
  })

  const itinerariTitle = testi?.['Corpo pagina "Itinerari"_title']

  const itinerariText = testi['Corpo pagina "Itinerari"']

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-itinerarioColor" currentPage="/itinerari" />
      <div className="bg-white p-3 pt-5">
        {itinerariTitle ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{itinerariTitle}</h1>
          </div>
        ) : (
          <p>Error loading Itinerari text data</p>
        )}

        {itinerariText ? renderContent(itinerariText) : <p>Error loading about text data</p>}
        <Suspense fallback={<div>Loading Itinerari component...</div>}>
          <ColorCardWrapper
            color="bg-itinerarioColor"
            jsonString={JSON.stringify(itinerari)}
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
