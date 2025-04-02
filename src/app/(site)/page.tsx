import React from 'react'
import { loadDb } from '@/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Copertina from '@/components/uiElements/copertina'
import { Media, Tracciati as TracciatiType } from '@/payload-types'
import GridOverlay from '@/components/uiElements/gridOverlay'
import { RandomPixel } from '@/components/uiElements/pixels'
import HomeCollection from '@/components/home/homeCollection'
import { getHomeTracksData } from '@/utils/getHomeData'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const db = await loadDb()
  const home = await db.findGlobal({ slug: 'home' })
  const metaImage = home?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'

  const title = home?.meta?.title ?? 'Morigerati'
  const description = home?.meta?.description || undefined

  return {
    title,
    description,
    openGraph: { title, description, images: imageUrl ? [{ url: imageUrl }] : undefined },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

const Home = async () => {
  const db = await loadDb()
  const home = await db.findGlobal({ slug: 'home' })

  const IntroSection = ({ isMobile = false }) => (
    <div
      className={`${isMobile ? 'sm:hidden' : 'hidden sm:flex flex-col'} md:w-full md:px-40 mb-4`}
    >
      <h2 className={`${isMobile ? 'pt-4 text-xl' : 'text-3xl'} text-center `}>{home.title}</h2>
      <RichText data={home.testo as SerializedEditorState} className="prose-custom" />
    </div>
  )

  return (
    <main className="max-w-screen-xl mx-auto">
      <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw] ">
        {home.cover && <Copertina copertina={home.cover as Media} />}
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-transInstrumentSans text-center font-bold text-white text-3xl z-10 max-w-xl px-4">
            {home.statement}
          </p>
        </div>
        <GridOverlay targetSquareSize={20} bottomDensity={1} effectRows={8} />
      </div>

      <div className="font-normal p-3 pt-4 w-full">
        <IntroSection />
        <IntroSection isMobile />

        <HomeCollection
          collection="itinerari"
          hasMap={true}
          tracciati={home.tracciati_mappa as TracciatiType[]}
          title={home.itinerari?.title || 'Itinerari'}
          text={(home.itinerari?.testo as SerializedEditorState) || ({} as SerializedEditorState)}
          locale="it"
        />
        <HomeCollection
          collection="luoghi"
          title={home.luoghi?.title || 'Luoghi'}
          text={(home.luoghi?.testo as SerializedEditorState) || ({} as SerializedEditorState)}
          locale="it"
        />
        <HomeCollection
          collection="residenze"
          title={home.residenze?.title || 'Residenze'}
          text={(home.residenze?.testo as SerializedEditorState) || ({} as SerializedEditorState)}
          locale="it"
        />
      </div>
    </main>
  )
}

export default Home
