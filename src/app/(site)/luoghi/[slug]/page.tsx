import React from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import CardGrid from '@/components/card/wrappers/cardsSwiper'
import { RandomPixel } from '@/components/uiElements/pixels'
import { notFound } from 'next/navigation'

import Copertina from '@/components/uiElements/copertina'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'

import StringToHTML from '@/components/serializer/stringToHTML'
import { Itinerari, Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'
import LuogoInfoRow from '@/components/luoghi/luogoInfoRow'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Luogo({ params }: { params: { slug: string } }) {
  const db = await loadDb()
  
  // Get luogo
  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
  })

  const luogoData = luoghi.docs.find((l) => l.id === params.slug)

  if (!luogoData) {
    notFound()
  }

  // Get all itinerari
  const allItinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
  })

  // Filter itinerari that have this luogo
  const itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
    itinerario.luoghi?.some((l) => 
      typeof l === 'string' ? l === luogoData.id : l.id === luogoData.id
    ),
  )

  const position: LatLngTuple = luogoData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="bg-white">
      <Copertina copertina={luogoData?.copertina as Media | undefined} />

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <BackButton />
        <RandomPixel p={3} />
        <div className="pt-4"></div>

        {/* Grid container for desktop layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-8">
          {/* Left column: Content */}
          <div>
            {luogoData.nome ? (
              <h1 className="text-4xl font-bold mb-4">{luogoData.nome}</h1>
            ) : (
              <p></p>
            )}
            <div className="mb-6">
              <StringToHTML htmlString={luogoData.testo_html ?? ''} />
            </div>
          </div>

          {/* Right column: Map */}
          <div className="lg:order-2">
            <div className="h-[500px] lg:sticky lg:top-4 flex items-center justify-center">
              <DynamicMappa
                initialPosition={position}
                initialZoom={14}
                localizedMedia={luogoData?.media_geolocalizzati}
                luogoMarker={luogoData}
              />
            </div>
          </div>
        </div>

        {/* Info row component */}
        <LuogoInfoRow
          servizi={luogoData.servizi}
          contatti={luogoData.contatti}
          orari_html={luogoData.orari_html}
          orari={luogoData.orari}
        />

        {/* Galleria section */}
        {luogoData.galleria && luogoData.galleria.length > 0 && (
          <div className="mt-8">
            <Galleria items={luogoData.galleria as Media[] | undefined} />
          </div>
        )}

        {/* Itinerari correlati section */}
        {itinerariCorrelati && itinerariCorrelati.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              In quale itinerario potrai trovarci
            </h2>
            <CardGrid
              items={itinerariCorrelati}
              category="itinerari"
            />
          </div>
        )}
      </div>
    </div>
  )
}
