import React from 'react'
import { loadDb } from '@/utils/db'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import BackButton from '@/components/uiElements/backButton'
import ItinerarioDetailsCard from '@/components/itinerari/itinerarioDetailsCard'
import { ServiziCardWrapper } from '@/components/itinerari/servizioCardWrapper'
import CardGrid from '@/components/card/cardsGrid'
import Galleria from '@/components/galleria/galleria'

import { getTracciatoUrl } from '@/utils/getTracciatoUrl'
import { Luoghi, Stakeholder } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'
import MediaViewer from '@/components/uiElements/mediaViewer'

import { type Media } from '@/payload-types'

import { RandomPixel } from '@/components/uiElements/pixels'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Locale } from '@/utils/localization'
import { getMessages } from '@/utils/getMessages'

interface ItinerarioParams {
  slug: string
  locale: string
}

interface PageProps {
  params: Promise<ItinerarioParams>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const db = await loadDb()
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
    notFound()
    return {
      title:
        locale === 'it'
          ? 'Itinerario non trovato | Morigerati'
          : 'Itinerary not found | Morigerati',
    }
  }

  const metaImage = itinerarioData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: `${itinerarioData.nome} | Morigerati`,
    description: itinerarioData?.meta?.description,
    openGraph: {
      title: itinerarioData?.meta?.title ?? itinerarioData.nome ?? 'Morigerati',
      description: itinerarioData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/${locale}/itinerari/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: itinerarioData?.meta?.title ?? itinerarioData.nome ?? 'Morigerati',
      description: itinerarioData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Itinerario({ params }: PageProps) {
  const { slug, locale } = await params
  const db = await loadDb()

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
  const messages = await getMessages(locale as Locale)
  const peopleTitle =
    messages?.common?.itinerari?.peopleYouWillFind ||
    (locale === 'it' ? 'Persone che troverai' : 'People you will find')
  const placesTitle =
    messages?.common?.itinerari?.placesYouWillVisit ||
    (locale === 'it' ? 'Luoghi che incontrerai' : 'Places you will visit')

  const position: LatLngTuple = [40.139949, 15.555182]

  return (
    <div className="">
      <Copertina copertina={itinerarioData?.copertina as Media | undefined} />

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <BackButton />

        <div className="pt-4"></div>

        {/* Grid container for desktop layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left column: Title, text, and details */}
          <div className="lg:order-1">
            {itinerarioData?.nome ? (
              <h1 className="text-4xl text-itinerarioColorScuro font-bold mb-4 break-words">
                {itinerarioData?.nome}
              </h1>
            ) : (
              <p></p>
            )}

            <ItinerarioDetailsCard
              lunghezza={itinerarioData?.lunghezza}
              tempo={itinerarioData?.tempo}
              dislivello={itinerarioData?.dislivello}
              difficolta={itinerarioData?.difficolta}
              tipo={itinerarioData?.tipo}
            />

            <div className="mb-6 mt-6">
              <RichText
                data={itinerarioData?.testo as SerializedEditorState}
                className="prose prose-lg"
              />
            </div>
          </div>

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
          {itinerarioData?.Video && (
            <div className="mb-4">
              <MediaViewer media={(itinerarioData?.Video as Media) || undefined} />
            </div>
          )}
          <Galleria items={itinerarioData?.galleria as Media[] | undefined} />

          <ServiziCardWrapper servizi={itinerarioData?.servizi} />

          {itinerarioData?.stakeholders && itinerarioData?.stakeholders.length > 0 && (
            <div className="">
              <h2 className="font-bold text-xl text-center pb-4">{peopleTitle}</h2>
              <CardGrid
                items={itinerarioData?.stakeholders as Stakeholder[]}
                category="stakeholders"
                singleRow
              />
            </div>
          )}

          {itinerarioData?.luoghi && itinerarioData?.luoghi.length > 0 && (
            <div className="">
              <h2 className="font-bold pt-4 text-xl text-center pb-4">{placesTitle}</h2>
              <CardGrid items={itinerarioData?.luoghi as Luoghi[]} category="luoghi" singleRow />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
