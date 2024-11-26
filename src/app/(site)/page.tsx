import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import MySwyper from '@/components/card/wrappers/cardsSwiper'
import GridOverlay from '@/components/uiElements/gridOverlay'
import StringToHTML from '@/components/serializer/stringToHTML'
import Copertina from '@/components/uiElements/copertina'
import { Media } from '@/payload-types'
import { Tracciati as TracciatiType } from '@/payload-types'
import { RandomPixel } from '@/components/uiElements/pixels'
import HomeCollection from '@/components/home/homeCollection'
import HomeTracksSection from '@/components/home/homeTracksSection'
import { getHomeTracksData } from '@/utils/getHomeData'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Home = async () => {
  const db = await loadDb()

  const home = await db.findGlobal({
    slug: 'home',
  })

  const { tracciati, mappaTitle, mappaText } = await getHomeTracksData()

  return (
    <main className=" max-w-screen-xl mx-auto">
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

      <div className=" font-normal p-3 pt-4 w-full ">
        {/* desktop */}
        <div className="hidden gap-3 sm:flex flex-col">
          <div className="flex justify-center">
            <h2 className="text-3xl text-center item-center content-center">{home.intro.title}</h2>
          </div>

          <div className="">
            <StringToHTML htmlString={home.intro.text_html ?? ''} classs="prose-custom" />
          </div>
        </div>
        {/* mobile */}
        <div className="text-center relative sm:hidden">
          <h2 className="pt-4 text-xl">{home.intro.title}</h2>
          <StringToHTML htmlString={home.intro.text_html ?? ''} classs="prose-custom-no-center" />
        </div>

        <HomeCollection collection="itinerari" />
        <div className="py-8">
          <HomeTracksSection
            title={mappaTitle}
            text_html={mappaText}
            tracciati={tracciati as TracciatiType[]}
          />
        </div>
        <HomeCollection collection="luoghi" layout="right" />
        <HomeCollection collection="residenze" />
      </div>
    </main>
  )
}

export default Home
