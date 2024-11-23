import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import { RandomPixel } from '@/components/uiElements/pixels'
import StringToHTML from '@/components/serializer/stringToHTML'
import Copertina from '@/components/uiElements/copertina'
import { type Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const About = async () => {
  const db = await loadDb()
  const about = await db.findGlobal({
    slug: 'chi_siamo',
  })
  return (
    <main className="max-w-screen-xl mx-auto pb-4">
      {about.copertina && <Copertina copertina={about.copertina as Media | undefined} />}
      <div className="relative bg-white p-3 pt-5 max-w-screen-xl mx-auto">
        <RandomPixel />
        <StringToHTML htmlString={about.testo_html ?? ''} />
      </div>
      <div className="p-4">
        <Galleria items={about.galleria as Media[] | undefined} />
      </div>
    </main>
  )
}

export default About
