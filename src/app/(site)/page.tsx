import React, { Suspense } from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'

import MySwyper from '@/components/mySwiper'
import renderContent from '@/utils/renderElement'
import { getMediaUrl } from '@/utils/media'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Home = async () => {
  const db = await loadDb()

  const home = await db.findGlobal({
    slug: 'home',
  })

  const itinerari = await db.find({
    collection: 'itinerari',
  })

  const luoghi = await db.find({
    collection: 'luoghi',
  })

  const residenze = await db.find({
    collection: 'residenze',
  })

  let coverUrl = getMediaUrl(home.cover)

  return (
    <main>
      <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
        {coverUrl && (
          <Image src={coverUrl} alt="Fullscreen Image" fill style={{ objectFit: 'cover' }} />
        )}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-transInstrumentSans text-center font-bold text-white text-3xl z-10 max-w-xl px-4">
            {home.statement}
          </p>
        </div>
      </div>

      <div className="bg-white font-bold p-3 pt-4 w-full leading-2">
        <p className="font-bold pt-4 text-xl ">{home.intro.title}</p>
        {home.intro ? renderContent(home.intro.text) : <p>Error loading testoHome data</p>}
        <p className="font-bold pt-4 text-xl text-center">{home.itinerari.title}</p>
        {home.itinerari ? (
          renderContent(home.itinerari.text)
        ) : (
          <p>Error loading itinerari text data</p>
        )}
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={itinerari.docs} color="bg-itinerarioColor" type="itinerari" />
        </Suspense>
        <p className="font-bold pt-4 text-xl text-center">{home.luoghi.title}</p>

        {home.luoghi ? renderContent(home.luoghi.text) : <p>Error loading luoghi text data</p>}
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={luoghi.docs} color="bg-luogoColor" type="luoghi" />
        </Suspense>
        <p className="font-bold pt-4 text-xl text-center">{home.residenze.title}</p>
        {home.residenze ? (
          renderContent(home.residenze.text)
        ) : (
          <p>Error loading residenze text data</p>
        )}
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={residenze.docs} color="bg-residenzeColor" type="residenze" />
        </Suspense>
      </div>
    </main>
  )
}

export default Home
