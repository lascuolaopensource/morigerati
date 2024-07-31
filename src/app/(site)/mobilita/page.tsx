import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import renderContent from '@/utils/renderElement'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Mobilita = async () => {
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })

  const mobilitaTitle = mobilita['Corpo pagina "mobilità sostenibile"_title']
  const mobilitaText = mobilita['Corpo pagina "mobilità sostenibile"']

  return (
    <main className="mx-auto max-w-xl">
      <div className="bg-white p-3 pt-5">
        {mobilitaTitle ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{mobilitaTitle}</h1>
          </div>
        ) : (
          <p>Error loading Itinerari text data</p>
        )}

        {mobilitaText ? renderContent(mobilitaText) : <p>Error loading about text data</p>}
      </div>
    </main>
  )
}

export default Mobilita
