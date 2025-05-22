// Boilerplate
import React from 'react'
import { Metadata } from 'next'
//PayloadCMS
import { loadDb } from '@/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Media, Tracciati as TracciatiType } from '@/payload-types'
//UI
import Copertina from '@/components/uiElements/copertina'
import GridOverlay from '@/components/uiElements/gridOverlay'
import HomeCollection from '@/components/home/homeCollection'
// Utils
import { getHomeTracksData } from '@/utils/getHomeData'
import { createMetadata } from '@/utils/metadataHelpers'
import { getLocale } from '@/utils/i18n'
import PixelBorder from '@/components/uiElements/pixelBorder'

//-------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const db = await loadDb()
  const home = await db.findGlobal({
    slug: 'home',
    locale: locale,
  })

  return createMetadata(home, {
    pagePath: '',
    titleField: 'title',
    defaultTitle: 'Morigerati - Transluoghi',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

// Accept params prop which includes the locale
export default async function Page() {
  const locale = (await getLocale()) as 'en' | 'it'
  const db = await loadDb()

  const home = await db.findGlobal({
    slug: 'home',
    locale: locale,
  })

  const { docs: tracciati } = await db.find({
    collection: 'tracciati',
  })

  return (
    <>
      <div className="relative">
        {home.cover && (
          <Copertina copertina={home.cover as Media} className="!h-[70vh] !max-h-[800px]" />
        )}

        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-transInstrumentSans text-center font-bold text-white text-3xl z-10 max-w-xl px-4">
            {home.statement}
          </p>
        </div>

        <GridOverlay targetSquareSize={16} bottomDensity={1} effectRows={8} />
      </div>

      <div className="flex flex-col gap-4 items-center py-12 px-4 md:px-8">
        <h2 className="text-3xl text-center">{home.title}</h2>
        <RichText
          data={home.testo as SerializedEditorState}
          className="prose md:prose-lg text-center"
        />
      </div>

      <PixelBorder className="bg-itinerariColor" />

      <HomeCollection
        collection="itinerari"
        hasMap={true}
        title={home.itinerari?.title} // Use optional chaining if structure might vary by locale
        text={home.itinerari?.testo as SerializedEditorState}
        tracciati={tracciati as TracciatiType[]}
        singleRow={true}
      />

      <PixelBorder className="bg-luoghiColor" />

      <HomeCollection
        collection="luoghi"
        title={home.luoghi?.title}
        text={home.luoghi?.testo as SerializedEditorState}
        singleRow={true}
        alignment="right"
      />

      <PixelBorder className="bg-residenzeColor" />

      <HomeCollection
        collection="residenze"
        title={home.residenze?.title}
        text={home.residenze?.testo as SerializedEditorState}
        singleRow={true}
      />

      <PixelBorder className="!bg-black" />
    </>
  )
}
