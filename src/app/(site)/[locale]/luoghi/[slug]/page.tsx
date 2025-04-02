import React from 'react'
import { Metadata } from 'next'

import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'

import CardGrid from '@/components/card/cardsGrid'
import { RandomPixel } from '@/components/uiElements/pixels'
import { notFound } from 'next/navigation'

import Copertina from '@/components/uiElements/copertina'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'

import { Luoghi, Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'
import LuogoInfoRow from '@/components/luoghi/luogoInfoRow'
import { ServiziCardWrapper } from '@/components/itinerari/servizioCardWrapper'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Locale } from '@/utils/localization'
import { getMessages } from '@/utils/getMessages'

interface LuogoParams {
  slug: string
  locale: Locale
}

interface PageProps {
  params: Promise<LuogoParams>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const db = await loadDb()
  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
    locale, // Pass the locale to get localized content
  })

  // For localized slugs, we need to find the document by checking if slug matches
  // the locale-specific value or the slug object contains the correct locale
  const luogoData = await luoghi.docs.find((l) => {
    if (typeof l.slug === 'object' && l.slug !== null) {
      return l.slug[locale] === slug
    }
    return l.slug === slug
  })

  if (!luogoData) {
    notFound()
    return { title: 'Luogo non trovato | Morigerati' }
  }

  const metaImage = luogoData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: `${luogoData.nome} | Morigerati`,
    description: luogoData.meta?.description,
    openGraph: {
      title: luogoData?.meta?.title ?? luogoData.nome ?? 'Morigerati',
      description: luogoData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/${locale}/luoghi/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: luogoData?.meta?.title ?? luogoData.nome ?? 'Morigerati',
      description: luogoData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LuogoPage({ params }: PageProps) {
  const { slug, locale } = await params
  const db = await loadDb()

  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
    locale, // Pass the locale to get localized content
  })

  // For localized slugs, we need to find the document by checking if slug matches
  // the locale-specific value or the slug object contains the correct locale
  const luogoData = luoghi.docs.find((l) => {
    if (typeof l.slug === 'object' && l.slug !== null) {
      return l.slug[locale] === slug
    }
    return l.slug === slug
  })

  if (!luogoData) {
    console.error(
      'Luogo not found. Available slugs:',
      luoghi.docs.map((l) => ({ id: l.id, slug: l.slug })),
    )
    notFound()
  }

  // Get all itinerari
  const allItinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
    locale, // Pass the locale to get localized content
  })

  // Filter itinerari that have this luogo, either through:
  // 1. Direct relationship from itinerari.luoghi to this luogo
  // 2. Inverse relationship stored in luogo.Itinerari_relation
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

  // Get translations
  const messages = await getMessages(locale)
  const itinerariesFoundInTitle =
    messages?.common?.strings?.itinerariesFoundIn ||
    (locale === 'it'
      ? 'Itinerari in cui potrai trovare questo luogo'
      : 'Itineraries where you can find this place')

  const position: LatLngTuple = luogoData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="">
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
              <h1 className="text-4xl text-luogoColorScuro font-bold mb-4">
                {typeof luogoData.nome === 'object' &&
                luogoData.nome !== null &&
                'it' in luogoData.nome
                  ? luogoData.nome[locale as keyof typeof luogoData.nome] ||
                    (luogoData.nome as Record<string, string>).it ||
                    ''
                  : luogoData.nome}
              </h1>
            ) : (
              <p></p>
            )}
            <div className="mb-6">
              <RichText
                data={
                  typeof luogoData.testo === 'object' &&
                  luogoData.testo !== null &&
                  'it' in luogoData.testo &&
                  'en' in luogoData.testo
                    ? (luogoData.testo[locale] as SerializedEditorState)
                    : (luogoData.testo as SerializedEditorState)
                }
                className="prose prose-lg"
              />
            </div>

            {/* Contacts and Hours */}
            <LuogoInfoRow
              contatti={(luogoData.contatti as []) ?? undefined}
              orari={
                typeof luogoData.orari === 'object' &&
                luogoData.orari !== null &&
                'it' in luogoData.orari &&
                'en' in luogoData.orari
                  ? (luogoData.orari[locale] as { root: any })
                  : (luogoData.orari as { root: any } | undefined)
              }
            />
          </div>

          {/* Right column: Map */}
          <div className="lg:order-2">
            <div className="h-[500px] flex items-center justify-center">
              <DynamicMappa initialPosition={position} initialZoom={14} showPositionPin={true} />
            </div>
          </div>
        </div>

        {/* Services section */}
        {luogoData.servizi && (
          <div>
            <ServiziCardWrapper
              servizi={
                typeof luogoData.servizi === 'object' &&
                luogoData.servizi !== null &&
                !Array.isArray(luogoData.servizi) &&
                'it' in luogoData.servizi &&
                'en' in luogoData.servizi
                  ? luogoData.servizi[locale]
                  : luogoData.servizi
              }
            />
          </div>
        )}

        {/* Galleria section */}
        {luogoData.galleria && luogoData.galleria.length > 0 && (
          <div className="mt-8">
            <Galleria items={luogoData.galleria as Media[] | undefined} />
          </div>
        )}

        {/* Itinerari correlati section */}
        {itinerariCorrelati && itinerariCorrelati.length > 0 && (
          <div className="mt-12 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">{itinerariesFoundInTitle}</h2>
            <div className="bg-luogoColor/5 p-6 rounded-lg">
              <CardGrid items={itinerariCorrelati} category="itinerari" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
