import React, { Suspense } from 'react'
import { findGlobals } from '@/utils/fetch'

import Image from 'next/image'

import Colorcard from '@/app/components/colorcard'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'

import loremPic from '@/public/loremPic.png'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface TextNode {
  text: string
  type: string
  version: number
  detail?: number
  format?: number
  mode?: string
  style?: string
}

interface RootNode {
  children: Array<{
    children: Array<TextNode>
    direction: string | null
    format: string
    indent: number
    type: string
    version: number
    textFormat?: number
    tag?: string
  }>
}

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

const renderElement = (element: TextNode, tag: string | undefined) => {
  switch (tag) {
    case 'h1':
      return <h1 className="font-normal text-3xl pt-4 pb-4 leading-4">{element.text}</h1>
    case 'h2':
      return <h2 className="font-normal text-2xl pt-4 pb-4 leading-2">{element.text}</h2>
    case 'h3':
      return <h3>{element.text}</h3>
    case 'p':
    default:
      return <p className="font-normal text-sm pt-2 leading-4">{element.text}</p>
  }
}

const Home = async () => {
  let statement = null
  let itinerariText = null
  let testoHome = null

  try {
    const globalData = (await findGlobals({ slug: 'home' })) as unknown as GlobalTesti
    statement = globalData.statement
    itinerariText = globalData.itinerari.root.children
    testoHome = globalData.testoHome.root.children
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-white" currentPage="/luoghi" />
      <div className="relative w-full h-screen">
        <Image src={loremPic} alt="Fullscreen Image" fill objectFit="cover" />

        {statement ? (
          <p className="absolute font-transInstrumentSans text-center font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
            {statement}
          </p>
        ) : (
          <p>Error loading statement data</p>
        )}
      </div>

      <div className="bg-white p-3 pt-5 w-full">
        {testoHome ? (
          testoHome.map((child, index) => (
            <React.Fragment key={index}>
              {child.children.map((element, subIndex) => (
                <React.Fragment key={subIndex}>{renderElement(element, child.tag)}</React.Fragment>
              ))}
            </React.Fragment>
          ))
        ) : (
          <p>Error loading testoHome data</p>
        )}

        <p className="font-bold pt-4 text-xl text-center">Itinerari</p>
        {itinerariText ? (
          itinerariText.map((child, index) => (
            <React.Fragment key={index}>
              {child.children.map((element, subIndex) => (
                <React.Fragment key={subIndex}>{renderElement(element, child.tag)}</React.Fragment>
              ))}
            </React.Fragment>
          ))
        ) : (
          <p>Error loading itinerari text data</p>
        )}
        <div className="pt-4"></div>
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
