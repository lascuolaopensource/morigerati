import React, { Suspense } from 'react'
import { findGlobals } from '@/utils/fetch'

import Image from 'next/image'

import Colorcard from '@/app/components/colorcard'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'

import loremPic from '@/public/loremPic.png'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  statement: string
  testoHome: {
    root: {
      children: Array<{
        children: Array<{
          text: string
        }>
      }>
    }
  }
  itinerari: {
    root: {
      children: Array<{
        children: Array<{
          text: string
        }>
      }>
    }
  }
  luoghi: {
    root: {
      children: Array<{
        children: Array<{
          text: string
        }>
      }>
    }
    residenze: {
      root: {
        children: Array<{
          children: Array<{
            text: string
          }>
        }>
      }
    }
  }
}

const Home = async () => {
  let statement = null
  let itinerariText = null
  let testoHome = null
  try {
    const globalData = (await findGlobals({ slug: 'home' })) as unknown as GlobalTesti
    statement = globalData.statement
    itinerariText = globalData.itinerari.root.children[0].children[0].text
    testoHome = globalData.itinerari.root.children[0].children[0].text
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-white" currentPage="/luoghi" />
      <div className="relative w-full h-screen">
        <Image src={loremPic} alt="Fullscreen Image" layout="fill" objectFit="cover" />

        {statement ? (
          <p className="absolute text-center font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
            {statement}
          </p>
        ) : (
          <p>Error loading Luoghi text data</p>
        )}
      </div>

      <div className="bg-white p-3 pt-5 w-full">
        {testoHome ? (
          <p className="font-normal text-sm pt-4 pb-4 leading-4">{testoHome}</p>
        ) : (
          <p>Error loading Luoghi text data</p>
        )}
        {itinerariText ? (
          <p className="font-normal text-sm pt-4 pb-4 leading-4">{itinerariText}</p>
        ) : (
          <p>Error loading Luoghi text data</p>
        )}
        <Suspense fallback={<div>Loading Luogo component...</div>}>
          <Colorcard color="bg-luogoColor" title="Luogo 1" />
          <Colorcard color="bg-luogoColor" title="Luogo 2" />
          <Colorcard color="bg-luogoColor" title="Luogo 3" />
          <Colorcard color="bg-luogoColor" title="Luogo 4" />
          <Colorcard color="bg-luogoColor" title="Luogo 5" />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default Home
