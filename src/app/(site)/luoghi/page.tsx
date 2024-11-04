import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCard/colorCardWrapper'
import StringToHTML from '@/components/serializer/stringToHTML'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Luoghi = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })
  const luoghi = await db.find({
    collection: 'luoghi',
  })

  return (
    <main>
      <div className="bg-white p-3 relative">
        {/* SVG Wrapper - posizionato sopra il contenuto ma sotto il footer */}
        <div className="fixed bottom-[var(--footer-height)] left-0 right-0 pointer-events-none"></div>

        {/* Contenuto principale */}
        <div className="relative z-10">
          {testi.luoghi.title ? (
            <div className="font-normal text-sm leading-4">
              <h1 className="font-bold text-[40px]">{testi.luoghi.title}</h1>
            </div>
          ) : (
            <p></p>
          )}

          <StringToHTML htmlString={testi.luoghi.text_html ?? ''} />

          <Suspense fallback={<div>Loading Cards...</div>}>
            <ColorCardWrapper
              color="luogoColor"
              colorScuro="luogoColorScuro"
              docs={luoghi.docs}
              previous="luoghi"
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default Luoghi
