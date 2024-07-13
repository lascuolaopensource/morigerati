import React, { Suspense } from 'react'
import { findGlobals, findCollection } from '@/utils/fetch'
import Image from 'next/image'
import renderElement, { RootNode } from '@/utils/renderElement'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import MySwyper from '@/components/mySwiper'
import loremPic from '@/public/loremPic.png'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  statement: string
  testoHome: {
    root: RootNode
  }
  itinerari: {
    root: RootNode
  }
  luoghi: {
    root: RootNode
  }
  residenze: {
    root: RootNode
  }
}

const Home = async () => {
  let statement = null
  let testoHome: RootNode | null = null
  let itinerariText: RootNode | null = null
  let luoghiText: RootNode | null = null
  let residenzeText: RootNode | null = null
  let collectionItinerari = null
  let collectionLuoghi = null
  let collectionResidenze = null

  try {
    const globalData = (await findGlobals({ slug: 'home' })) as unknown as GlobalTesti
    statement = globalData.statement
    testoHome = globalData.testoHome.root
    itinerariText = globalData.itinerari.root
    luoghiText = globalData.luoghi.root
    residenzeText = globalData.residenze.root
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  try {
    const [itinerariData, luoghiData, residenzeData] = await Promise.all([
      findCollection({ collection: 'itinerari' }),
      findCollection({ collection: 'luoghi' }),
      findCollection({ collection: 'residenze' }),
    ])
    collectionItinerari = itinerariData
    collectionLuoghi = luoghiData
    collectionResidenze = residenzeData
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-white" currentPage="/" />
      <div className="relative w-full h-[80vh]">
        <Image src={loremPic} alt="Fullscreen Image" fill objectFit="cover" />
        {statement ? (
          <p className="absolute font-transInstrumentSans text-center font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
            {statement}
          </p>
        ) : (
          <p>Error loading statement data</p>
        )}
      </div>
      <div className="bg-white font-bold p-3 pt-4 w-full leading-2">
        {testoHome ? renderElement([testoHome]) : <p>Error loading testoHome data</p>}
        <p className="font-bold pt-4 text-xl text-center">Itinerari</p>
        {itinerariText ? renderElement([itinerariText]) : <p>Error loading itinerari text data</p>}
        <div className="pt-4"></div>
        <MySwyper json={JSON.stringify(collectionItinerari)} color="bg-itinerarioColor" />
        <p className="font-bold pt-4 text-xl text-center">Luoghi</p>
        {luoghiText ? renderElement([luoghiText]) : <p>Error loading luoghi text data</p>}
        <div className="pt-4"></div>
        <MySwyper json={JSON.stringify(collectionLuoghi)} color="bg-luogoColor" />
        <p className="font-bold pt-4 text-xl text-center">Residenze</p>
        {residenzeText ? renderElement([residenzeText]) : <p>Error loading residenze text data</p>}
        <div className="pt-4"></div>
        <MySwyper json={JSON.stringify(collectionResidenze)} color="bg-residenzeColor" />
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default Home
