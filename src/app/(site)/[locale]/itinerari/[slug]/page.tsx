//Boilerplate
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
//DB
import { loadDb } from '@/utils/db'
import type { Luoghi, Persone } from '@/payload-types'
import type { Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
//Components
import BackButton from '@/components/uiElements/backButton'
import ItinerarioDetailsCard from '@/components/itinerari/itinerarioDetailsCard'
import { ServiziCardWrapper } from '@/components/itinerari/servizioCardWrapper'
import CardGrid from '@/components/card/cardsGrid'
import Galleria from '@/components/galleria/galleria'
import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'
import MediaViewer from '@/components/uiElements/mediaViewer'
import { getTracciatoUrl } from '@/utils/getTracciatoUrl'
//Locale
import { getLocale, getMessages } from 'next-intl/server'
import { createMetadata } from '@/utils/metadataHelpers'
import { DetailPageHeading } from '@/components/pageLayout/detailPageHeading'
import { Container } from '@/components/uiElements/container'
import { ServiziSection } from '@/components/uiElements/serviziSection'

interface ItinerarioParams {
  slug: string
}

interface PageProps {
  params: Promise<ItinerarioParams>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const itinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
    locale: locale as 'it' | 'en',
  })

  // For localized slugs, we need to find the document by checking if slug matches
  // the locale-specific value or the slug object contains the correct locale
  const itinerarioData = itinerari.docs.find((i) => {
    if (typeof i.slug === 'object' && i.slug !== null) {
      return i.slug[locale] === slug
    }
    return i.slug === slug
  })

  if (!itinerarioData) {
    notFound()
    return {
      title:
        locale === 'it'
          ? 'Itinerario non trovato | Morigerati'
          : 'Itinerary not found | Morigerati',
    }
  }

  return createMetadata(itinerarioData, {
    pagePath: `itinerari/${slug}`,
    titleField: 'nome',
    defaultTitle: locale === 'it' ? 'Itinerario' : 'Itinerary',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Itinerario({ params }: PageProps) {
  const slug = (await params).slug
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'

  const itinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
    locale: locale as 'it' | 'en', // Casting per utilizzare il tipo corretto
  })

  // For localized slugs, we need to find the document by checking if slug matches
  // the locale-specific value or the slug object contains the correct locale
  const itinerarioData = itinerari.docs.find((i) => {
    if (typeof i.slug === 'object' && i.slug !== null) {
      return i.slug[locale] === slug
    }
    return i.slug === slug
  })

  if (!itinerarioData) {
    console.error(
      'Itinerario not found. Available slugs:',
      itinerari.docs.map((i) => ({ id: i.id, slug: i.slug })),
    )
    notFound()
  }

  // Get translations
  const messages = await getMessages()
  const peopleTitle =
    messages?.common?.itinerari?.peopleYouWillFind ||
    (locale === 'it' ? 'Persone che troverai' : 'People you will find')
  const placesTitle =
    messages?.common?.itinerari?.placesYouWillVisit ||
    (locale === 'it' ? 'Luoghi che incontrerai' : 'Places you will visit')

  const position: LatLngTuple = [40.139949, 15.555182]

  const galleryItems = (itinerarioData.galleria as Media[]) || []

  return (
    <>
      <Copertina copertina={itinerarioData.copertina as Media} />

      <DetailPageHeading
        title={itinerarioData.nome}
        collection="itinerari"
        backButton={{
          href: '/itinerari',
          message: messages.backButton.itinerari,
        }}
        mapProps={{
          gpxUrl: getTracciatoUrl(itinerarioData?.tracciato_gpx),
          showGpxDownload: true,
        }}
      >
        <ItinerarioDetailsCard
          lunghezza={itinerarioData?.lunghezza}
          tempo={itinerarioData?.tempo}
          dislivello={itinerarioData?.dislivello}
          difficolta={itinerarioData?.difficolta}
          tipo={itinerarioData?.tipo}
        />
      </DetailPageHeading>

      <Container className="max-w-prose space-y-8">
        {itinerarioData?.Video && (
          <div className="rounded-md overflow-hidden">
            <MediaViewer media={itinerarioData?.Video as Media} />
          </div>
        )}

        <RichText
          data={itinerarioData?.testo as SerializedEditorState}
          className="prose md:prose-lg"
        />

        <ServiziSection servizi={itinerarioData?.servizi} collection="itinerari" />
      </Container>

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        {/* Right column: Map */}
        <div className="lg:order-2">
          <div className="h-[500px]">
            <DynamicMappa
              initialPosition={position}
              initialZoom={14}
              gpxUrl={getTracciatoUrl(itinerarioData?.tracciato_gpx)}
              localizedMedia={itinerarioData?.media_geolocalizzati}
            />
          </div>
        </div>
      </div>

      {/* Content below the two columns */}
      <div className="">
        {galleryItems.length > 0 && (
          <div className="mb-4">
            <Galleria items={galleryItems} />
          </div>
        )}

        <ServiziCardWrapper servizi={itinerarioData?.servizi} />

        {itinerarioData?.persone && itinerarioData?.persone.length > 0 && (
          <div className="">
            <h2 className="font-bold text-xl text-center pb-4">{peopleTitle}</h2>
            <CardGrid items={itinerarioData?.persone as Persone[]} category="persone" singleRow />
          </div>
        )}

        {itinerarioData?.luoghi && itinerarioData?.luoghi.length > 0 && (
          <div className="">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">{placesTitle}</h2>
            <CardGrid items={itinerarioData?.luoghi as Luoghi[]} category="luoghi" singleRow />
          </div>
        )}
      </div>
    </>
  )
}
