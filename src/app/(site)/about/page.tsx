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

  const aboutTitle = about['Corpo pagina "chi siamo"_title']

  return (
    <main className="mx-auto max-w-xl">
      <div className="bg-white p-3 pt-5">
        {aboutTitle ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{aboutTitle}</h1>
          </div>
        ) : (
          <p>Error loading Itinerari text data</p>
        )}

        {about['Corpo pagina "chi siamo"_title'] ? (
          renderContent(about['Corpo pagina "chi siamo"'])
        ) : (
          <p>Error loading about text data</p>
        )}
      </div>
    </main>
  )
}

export default About
