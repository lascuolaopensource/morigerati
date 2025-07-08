// Boilerplate
import React from 'react'
import { Metadata } from 'next'
//PayloadCMS
import { loadDb } from '@/modules/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Media, Tracciati as TracciatiType } from '@/payload-types'
//UI
import Copertina from '@/modules/components/uiElements/copertina'
import GridOverlay from '@/modules/components/uiElements/gridOverlay'
import PixelBorder from '@/modules/components/uiElements/pixelBorder'

// Utils
import { getLocale } from '@/modules/i18n'
import HomeCollection from '@/modules/components/home/homeCollection'
import { createMetadata } from '@/modules/seo'
import { Map } from '@/modules/components/mappa-new/map'
import { GpxTracks } from '@/modules/components/mappa-new/gpx-tracks'
import HomeTracksSection from '@/modules/components/home/homeTracksSection'

//

async function load() {
  const locale = await getLocale()
  const db = await loadDb()
  const home = await db.findGlobal({
    slug: 'home',
    locale: locale,
  })
  return { locale, home }
}

export default async function Page() {
  const { home } = await load()

  const db = await loadDb()

  const tracciatiQuery = await db.find({
    collection: 'tracciati',
  })

  const trackColors = [
    '#FF5733', // Rosso-arancio
    '#33FF57', // Verde lime
    '#3357FF', // Blu
    '#FF33F6', // Rosa
    '#33FFF6', // Ciano
    '#F6FF33', // Giallo
    '#9933FF', // Viola
    '#FF8333', // Arancione
    '#33FF99', // Verde acqua
    '#FF3333', // Rosso
  ]

  const tracciati = tracciatiQuery.docs

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
        title={home.itinerari?.title} // Use optional chaining if structure might vary by locale
        text={home.itinerari?.testo as SerializedEditorState}
      >
        <div className="md:w-[400px] w-[calc(100vw-4rem)]">
          <HomeTracksSection tracciati={tracciati} />
        </div>
      </HomeCollection>

      <PixelBorder className="bg-luoghiColor" />

      <HomeCollection
        collection="luoghi"
        title={home.luoghi?.title}
        text={home.luoghi?.testo as SerializedEditorState}
        alignment="right"
      />

      <PixelBorder className="bg-residenzeColor" />

      <HomeCollection
        collection="residenze"
        title={home.residenze?.title}
        text={home.residenze?.testo as SerializedEditorState}
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await load()

  return createMetadata({
    pathname: '/',
    locale,
  })
}
