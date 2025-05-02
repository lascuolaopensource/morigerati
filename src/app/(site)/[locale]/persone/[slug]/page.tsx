//Boilerplate
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/utils/db'
import type { Media } from '@/payload-types'
//Components
import BackButton from '@/components/uiElements/backButton'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'
import Galleria from '@/components/galleria/galleria'
// New imported components
import PersonaHeader from '@/components/persone/PersonaHeader'
import PersonaContent from '@/components/persone/PersonaContent'
import PersonaContacts from '@/components/persone/PersonaContacts'
import LuogoMap from '@/components/luoghi/LuogoMap'
import RelatedItineraries from '@/components/luoghi/RelatedItineraries'
//Locale
import { getMessages, getLocale } from 'next-intl/server'
//Metadata
import { createMetadata } from '@/utils/metadataHelpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const persone = await db.find({ collection: 'persone', depth: 2, locale: locale })

  const stakeholderData = persone.docs.find((s) => s.slug === slug)

  if (!stakeholderData) {
    notFound()
    return {
      title: locale === 'it' ? 'Persona non trovata | Morigerati' : 'Person not found | Morigerati',
    }
  }

  return createMetadata(stakeholderData, {
    pagePath: `persone/${slug}`,
    titleField: 'nome',
    defaultTitle: locale === 'it' ? 'Persona' : 'Person',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function persone({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()

  // Get translation messages
  const messages = await getMessages()

  // Get persone
  const persone = await db.find({ collection: 'persone', depth: 2, locale: 'all' })

  const stakeholderData = persone.docs.find((s) => s.slug === slug)

  if (!stakeholderData) {
    notFound()
  }

  // Get all itinerari
  const allItinerari = await db.find({ collection: 'itinerari' })

  // Filter itinerari that have this persone
  const itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
    itinerario.persone?.some((s) =>
      typeof s === 'string' ? s === stakeholderData.id : s.id === stakeholderData.id,
    ),
  )

  const position: LatLngTuple = stakeholderData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="">
      <Copertina copertina={stakeholderData.copertina as Media} />

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <BackButton message={messages.backButton.persone} redirect={'/persone'} />
        <div className="pt-4"></div>

        {/* Grid container for desktop layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-8">
          {/* Left column: Content */}
          <div>
            <PersonaHeader
              nome={stakeholderData.nome}
              tipologia={stakeholderData.tipologia}
              indirizzo={stakeholderData.indirizzo}
              locale={locale}
              messages={messages}
            />

            <PersonaContent testo={stakeholderData.testo} locale={locale} />

            <PersonaContacts contatti={stakeholderData.contatti} locale={locale} />
          </div>

          {/* Right column: Map */}
          <div className="lg:order-2">
            <LuogoMap position={position} />
          </div>
        </div>

        {/* Galleria */}
        {stakeholderData.galleria && stakeholderData.galleria.length > 0 && (
          <div className="mt-8">
            <Galleria items={stakeholderData.galleria as Media[]} />
          </div>
        )}

        {/* Itinerari correlati */}
        <RelatedItineraries
          itinerari={itinerariCorrelati}
          messageTitle={messages.strings.itinerariesFoundIn}
        />
      </div>
    </div>
  )
}
