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

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const db = await loadDb()
  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
  })

  const luogoData = await luoghi.docs.find((l) => l.slug === slug)

  if (!luogoData) {
    notFound()
    return {
      title: 'Luogo non trovato | Morigerati',
    }
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
      url: `${baseUrl}/luoghi/${slug}`,
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

export default async function LuogoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const db = await loadDb()
  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
  })

  const luogoData = luoghi.docs.find((l) => l.slug === slug)

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
      typeof l === 'string' ? l === luogoData.id : l.id === luogoData.id,
    ),
  )

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
              <h1 className="text-4xl text-luogoColorScuro font-bold mb-4">{luogoData.nome}</h1>
            ) : (
              <p></p>
            )}
            <div className="mb-6">
              <RichText
                data={luogoData.testo as SerializedEditorState}
                className="prose prose-lg"
              />
            </div>

            {/* Contacts and Hours */}
            <LuogoInfoRow
              contatti={(luogoData.contatti as []) ?? undefined}
              orari={luogoData.orari as any | undefined}
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
        <div>
          <ServiziCardWrapper servizi={luogoData.servizi as any} />
        </div>

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
            <CardGrid items={itinerariCorrelati} category="itinerari" />
          </div>
        )}
      </div>
    </div>
  )
}
