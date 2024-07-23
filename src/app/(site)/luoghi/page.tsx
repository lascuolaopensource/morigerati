import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import renderContent from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Luoghi = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const luoghiTitle = testi?.['Corpo pagina "Luoghi"_title']

  const luoghiText = testi?.['Corpo pagina "Luoghi"']

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-itinerarioColor" currentPage="/luoghi" />
      <div className="bg-white p-3 pt-5">
        {luoghiTitle ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{luoghiTitle}</h1>
          </div>
        ) : (
          <p>Error loading Itinerari text data</p>
        )}

        {luoghiText ? renderContent(luoghiText) : <p>Error loading about text data</p>}
        {/*         <Suspense fallback={<div>Loading Itinerari component...</div>}>
          <ColorCardWrapper
            color="bg-itinerarioColor"
            jsonString={JSON.stringify(collectionItinerari)}
            previous="itinerari"
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense> */}
      </div>
    </main>
  )
}

export default Luoghi
