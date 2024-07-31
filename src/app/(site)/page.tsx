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
      <div className="relative w-full h-[80vh]">
        {coverUrl && <Image src={coverUrl} alt="Fullscreen Image" fill objectFit="cover" />}
        <p className="absolute font-transInstrumentSans text-center font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
          {home.statement}
        </p>
      </div>

      <div className="bg-white font-bold p-3 pt-4 w-full leading-2">
        <p className="font-bold pt-4 text-xl ">{home.intro.title}</p>
        {home.intro ? renderContent(home.intro.text) : <p>Error loading testoHome data</p>}
        <p className="font-bold pt-4 text-xl text-center">{home.itinerari.title}</p>
        {home.itinerari ? renderContent(home.itinerari) : <p>Error loading itinerari text data</p>}
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={itinerari.docs} color="bg-itinerarioColor" type="itinerari" />
        </Suspense>
        <p className="font-bold pt-4 text-xl text-center">{home.luoghi.title}</p>

        {home.luoghi ? renderContent(home.luoghi) : <p>Error loading luoghi text data</p>}
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={luoghi.docs} color="bg-luogoColor" type="luoghi" />
        </Suspense>
        <p className="font-bold pt-4 text-xl text-center">{home.residenze.title}</p>
        {home.residenze ? renderContent(home.residenze) : <p>Error loading residenze text data</p>}
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={residenze.docs} color="bg-residenzeColor" type="residenze" />
        </Suspense>
      </div>
    </main>
  )
}

export default Home
