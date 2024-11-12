import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import { RandomPixel } from '@/components/uiElements/pixels'

import StringToHTML from '@/components/serializer/stringToHTML'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const About = async () => {
  const db = await loadDb()
  const about = await db.findGlobal({
    slug: 'chi_siamo',
  })
  return (
    <main className="max-w-screen-xl mx-auto relative bg-white p-3 pt-5">
      <RandomPixel size={10} />
      <StringToHTML htmlString={about.testo_html ?? ''} />
    </main>
  )
}

export default About
