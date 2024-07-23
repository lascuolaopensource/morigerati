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

  const aboutData = typeof about === 'string' ? JSON.parse(about) : about

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-white" currentPage="/about" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-normal text-3xl pt-4 pb-4 leading-4">Chi siamo</h1>

        {aboutData ? renderContent(aboutData) : <p>Error loading about text data</p>}
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default About
