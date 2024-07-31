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

  return (
    <main className="mx-auto max-w-xl">
      <div className="bg-white p-3 pt-5">
        {mobilita.testo ? renderContent(mobilita.testo) : <p>Error loading about text data</p>}
      </div>
    </main>
  )
}

export default Mobilita
