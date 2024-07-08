import React, { Suspense } from 'react'
import { findGlobals, findCollection } from '@/utils/fetch'

import Image from 'next/image'

import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'

import MySwyper from '@/app/components/mySwiper'

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
  let testoHome = null
  let itinerariText = null
  let luoghiText = null
  let residenzeText = null

  let collectionItinerari = null
  let collectionLuoghi = null
  let collectionResidenze = null

  try {
    const globalData = (await findGlobals({ slug: 'home' })) as unknown as GlobalTesti
    statement = globalData.statement
    testoHome = globalData.testoHome.root.children
    itinerariText = globalData.itinerari.root.children
    luoghiText = globalData.luoghi.root.children
    residenzeText = globalData.residenze.root.children
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  try {
    const [itinerariData, luoghiData, residenzeData] = await Promise.all([
      findCollection({ collection: 'itinerari' }),
      findCollection({ collection: 'luoghi' }),
      findCollection({ collection: 'residenze' }),
    ])
    ;(collectionItinerari = itinerariData), (collectionLuoghi = luoghiData)
    collectionResidenze = residenzeData
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main>
      <Navbar backgroundColor="bg-white" currentPage="/" />
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
        <MySwyper json={JSON.stringify(collectionItinerari)} color="bg-itinerarioColor" />

        <p className="font-bold pt-4 text-xl text-center">Luoghi</p>

        {luoghiText ? (
          luoghiText.map((child, index) => (
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
        <MySwyper json={JSON.stringify(collectionLuoghi)} color="bg-luogoColor" />

        <p className="font-bold pt-4 text-xl text-center">Residenze</p>

        {residenzeText ? (
          residenzeText.map((child, index) => (
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
        <MySwyper json={JSON.stringify(collectionResidenze)} color="bg-residenzeColor" />
      </div>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default Home
