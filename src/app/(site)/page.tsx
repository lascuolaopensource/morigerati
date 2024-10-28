import React, { Suspense } from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'

import MySwyper from '@/components/mySwiper'

import HomePixel from '@/public/pixels/home.svg'
import GridOverlay from '@/components/gridOverlay'

import StringToHTML from '@/components/serializer/stringToHTML'
import Copertina from '@/components/copertina'

import { Media } from '@/payload-types'

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

  return (
    <main>
      <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
        {home.cover && <Copertina copertina={home.cover as Media | undefined} />}

        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-transInstrumentSans text-center font-bold text-white text-3xl z-10 max-w-xl px-4">
            {home.statement}
          </p>
        </div>
        <GridOverlay targetSquareSize={20} bottomDensity={1} effectRows={8} />
      </div>

      <div className="bg-white font-normal p-3 pt-4 w-full">
        <div className="relative">
          <h2 className=" pt-4 text-xl ">{home.intro.title}</h2>
          <StringToHTML htmlString={home.intro.text_html ?? ''} />
          <div className="absolute inset-0 flex justify-end">
            <HomePixel width={200} className="absolute right-0" />
          </div>
        </div>

        <h2 className="pt-4 text-xl text-center">{home.itinerari.title}</h2>

        <StringToHTML htmlString={home.itinerari.text_html ?? ''} />

        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={itinerari.docs} color="bg-itinerarioColor" type="itinerari" />
        </Suspense>
        <h2 className="pt-4 text-xl text-center">{home.luoghi.title}</h2>

        <StringToHTML htmlString={home.luoghi.text_html ?? ''} />

        <div className="pt-4 "></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={luoghi.docs} color="bg-luogoColor" type="luoghi" />
        </Suspense>
        <h2 className="pt-4 text-xl text-center">{home.residenze.title}</h2>
        <StringToHTML htmlString={home.residenze.text_html ?? ''} />
        <div className="pt-4"></div>
        <Suspense fallback={<div>Loading slides...</div>}>
          <MySwyper items={residenze.docs} color="bg-residenzeColor" type="residenze" />
        </Suspense>
      </div>
    </main>
  )
}

export default Home
