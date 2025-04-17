//Boilerplate
import React from 'react'
import { notFound } from 'next/navigation'
//DB
import { loadDb } from '@/utils/db'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Media } from '@/payload-types'
//Components
import BackButton from '@/components/uiElements/backButton'
import { RandomPixel } from '@/components/uiElements/pixels'
import Copertina from '@/components/uiElements/copertina'
import { LatLngTuple } from 'leaflet'
import Galleria from '@/components/galleria/galleria'
// New imported components
import LuogoHeader from '@/components/luoghi/LuogoHeader'
import LuogoMap from '@/components/luoghi/LuogoMap'
import RelatedItineraries from '@/components/luoghi/RelatedItineraries'
import ServiziSection from '@/components/luoghi/ServiziSection'
import LuogoInfoSection from '@/components/luoghi/LuogoInfoSection'
//Locale
import { getLocale, getMessages } from 'next-intl/server'
//Metadata
import { generateMetadataForPage } from '@/utils/generateMetadata'

interface LuogoParams {
  slug: string
}

interface PageProps {
  params: Promise<LuogoParams>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LuogoPage({ params }: PageProps) {
  const { slug } = await params
  const locale = (await getLocale()) as 'it' | 'en'
  const messages = await getMessages()
  const db = await loadDb()

  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
    locale: locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const luogoData = luoghi.docs[0]

  if (!luogoData) {
    console.error('Luogo not found with slug:', slug)
    notFound()
  }

  generateMetadataForPage({
    title: luogoData.nome || 'Titolo di default',
    description: luogoData.meta?.description || undefined,
    imageUrl: luogoData.copertina as string,
    collection: 'luoghi',
    slug,
  })

  // Get all itinerari
  const allItinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
    locale: locale,
  })

  let itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
    itinerario.luoghi?.some((l) =>
      typeof l === 'string' ? l === luogoData.id : l.id === luogoData.id,
    ),
  )

  // If Itinerari_relation exists, add those itinerari too (if not already included)
  if (luogoData.Itinerari_relation && Array.isArray(luogoData.Itinerari_relation)) {
    const itinerariFromRelation = luogoData.Itinerari_relation.map((rel) =>
      typeof rel === 'string' ? rel : rel.id,
    )

    // Get any itineraries from the relation that aren't already in itinerariCorrelati
    const additionalItinerari = allItinerari.docs.filter(
      (itinerario) =>
        itinerariFromRelation.includes(itinerario.id) &&
        !itinerariCorrelati.some((i) => i.id === itinerario.id),
    )

    // Combine the arrays if there are additional itineraries
    if (additionalItinerari.length > 0) {
      itinerariCorrelati = [...itinerariCorrelati, ...additionalItinerari]
    }
  }

  const position: LatLngTuple = luogoData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="">
      <Copertina copertina={luogoData?.copertina as Media} />

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <BackButton message={messages.backButton.luoghi} redirect={`/luoghi`} />
        <RandomPixel p={3} />
        <div className="pt-4"></div>

        {/* Grid container for desktop layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-8">
          {/* Left column: Content */}
          <div>
            <LuogoHeader nome={luogoData.nome} testo={luogoData.testo} locale={locale} />

            {/* Contacts and Hours - now using LuogoInfoSection */}
            <LuogoInfoSection luogoData={luogoData} />
          </div>

          {/* Right column: Map */}
          <div className="lg:order-2">
            <LuogoMap position={position} />
          </div>
        </div>

        {/* Services section */}
        <ServiziSection servizi={luogoData.servizi} />

        <div className="mt-8">
          <Galleria
            items={(luogoData.galleria as Media[]) || []}
            titleColor="text-luogoColorScuro"
          />
        </div>

        {/* Itinerari correlati section */}
        <RelatedItineraries
          itinerari={itinerariCorrelati}
          messageTitle={messages.strings.itinerariesFoundIn}
        />
      </div>
    </div>
  )
}
