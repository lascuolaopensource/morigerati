import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import renderContent from '@/utils/renderElement'

import StringToHTML from '@/components/serializer/stringToHTML'

import ChiSiamoPixel from '@/public/pixels/chiSiamo.svg'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const About = async () => {
  const db = await loadDb()
  const about = await db.findGlobal({
    slug: 'chi_siamo',
  })
  return (
    <main className="relative bg-white p-3 pt-5">
      <div className="absolute inset-0 flex justify-end">
        <ChiSiamoPixel width={200} className="absolute right-0 " />
      </div>
      <StringToHTML htmlString={about.testo_html ?? ''} />
    </main>
  )
}

export default About
