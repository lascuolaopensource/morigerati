import React, { Suspense } from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import MySwyper from '@/components/mySwiper'
import loremPic from '@/public/loremPic.png'
import renderContent from '@/utils/renderElement'
import { Media } from '@/payload-types'
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
      <Navbar backgroundColor="bg-white" currentPage="/" />

      <div className="relative w-full h-[80vh]">
        {coverUrl && <Image src={coverUrl} alt="Fullscreen Image" fill objectFit="cover" />}
        <p className="absolute font-transInstrumentSans text-center font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
          {home.statement}
        </p>
      </div>

      <div className="bg-white font-bold p-3 pt-4 w-full leading-2">
        <p className="font-bold pt-4 text-xl ">{home.intro_title}</p>
        {home.intro ? renderContent(home.intro) : <p>Error loading testoHome data</p>}
        <p className="font-bold pt-4 text-xl text-center">{home.itinerari_title}</p>
        {home.itinerari ? renderContent(home.itinerari) : <p>Error loading itinerari text data</p>}
        <div className="pt-4"></div>
        <MySwyper json={JSON.stringify(itinerari)} color="bg-itinerarioColor" />
        <p className="font-bold pt-4 text-xl text-center">{home.luoghi_title}</p>
        {home.luoghi ? renderContent(home.luoghi) : <p>Error loading luoghi text data</p>}
        <div className="pt-4"></div>
        <MySwyper json={JSON.stringify(luoghi)} color="bg-luogoColor" />
        <p className="font-bold pt-4 text-xl text-center">{home.residenze_title}</p>
        {home.residenze ? renderContent(home.residenze) : <p>Error loading residenze text data</p>}
        <div className="pt-4"></div>
        <MySwyper json={JSON.stringify(residenze)} color="bg-residenzeColor" />
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default Home
