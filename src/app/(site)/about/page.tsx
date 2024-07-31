import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import renderContent from '@/utils/renderElement'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const About = async () => {
  const db = await loadDb()
  const about = await db.findGlobal({
    slug: 'chi_siamo',
  })
  return (
    <main className="mx-auto max-w-xl">
      <div className="bg-white p-3 pt-5">
        {about.testo ? renderContent(about.testo) : <p>Error loading about text data</p>}
      </div>
    </main>
  )
}

export default About
