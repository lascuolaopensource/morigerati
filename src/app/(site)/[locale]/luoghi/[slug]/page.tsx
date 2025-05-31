import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { loadDb } from '@/utils/db'
import type { Luoghi, Media } from '@/payload-types'

import Copertina from '@/components/uiElements/copertina'
import { LatLngTuple } from 'leaflet'
import Galleria from '@/components/galleria/galleria'

import { getLocale, getMessages } from 'next-intl/server'

import { createMetadata } from '@/utils/metadataHelpers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import PixelBorder from '@/components/uiElements/pixelBorder'
import { Container } from '@/components/uiElements/container'
import { CardServizio } from '@/components/uiElements/cardServizio'
import { useMessages } from 'next-intl'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { DetailPageHeading } from '@/components/pageLayout/detailPageHeading'
import { Contatti } from '@/components/uiElements/contatti'

import { InfoSection } from '@/components/uiElements/infoSection'
import { ServiziSection } from '@/components/uiElements/serviziSection'

//

interface LuogoParams {
  slug: string
}

interface PageProps {
  params: Promise<LuogoParams>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()

  const luoghi = await db.find({
    collection: 'luoghi',
    depth: 2,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const luogoData = luoghi.docs[0]

  return createMetadata(luogoData, {
    pagePath: `luoghi/${slug}`,
    titleField: 'nome',
    defaultTitle: locale === 'it' ? 'Luogo' : 'Place',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

//

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

  const galleryItems = (luogoData.galleria as Media[]) || []

  return (
    <>
      <Copertina copertina={luogoData?.copertina as Media} />

      <DetailPageHeading
        collection="luoghi"
        backButton={{ message: messages.backButton.luoghi, href: `/luoghi` }}
        title={luogoData.nome}
        mapProps={{
          initialPosition: luogoData.posizione,
        }}
      />

      <Container className="max-w-prose space-y-8">
        <RichText data={luogoData.testo} className="prose md:prose-lg" />
        <PixelBorder className="bg-luoghiColor !h-10" />
        <ServiziSection servizi={luogoData.servizi} collection="luoghi" />
        <LuogoInfoSection luogo={luogoData} />
      </Container>

      {/* TODO: Add related itineraries */}
      {/* <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">

        <RelatedItineraries
          itinerari={itinerariCorrelati}
          messageTitle={messages.strings.itinerariesFoundIn}
        />
      </div> */}

      <PixelBorder className={`w-full bg-luoghiColor`} />

      {galleryItems.length > 0 && (
        <div className={`bg-luoghiColor`}>
          <Container>
            <Galleria items={galleryItems} />
          </Container>
        </div>
      )}
    </>
  )
}

//

function LuogoInfoSection(props: { luogo: Luoghi }) {
  const { luogo } = props
  const messages = useMessages()

  const contatti = luogo.contatti ?? []
  const hasContatti = contatti.length > 0

  const orari = luogo.orari
  const hasOrari = orari?.root && !isRichTextEmpty(orari)

  if (!hasContatti && !hasOrari) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {hasContatti && (
        <InfoSection collection="luoghi" title={messages.luoghi.contacts}>
          <Contatti contatti={contatti} />
        </InfoSection>
      )}

      {hasOrari && (
        <InfoSection collection="luoghi" title={messages.luoghi.openingHours} text={orari} />
      )}
    </div>
  )
}
