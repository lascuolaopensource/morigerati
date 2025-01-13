import React from 'react'
import { loadDb } from '@/utils/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import BackButton from '@/components/uiElements/backButton'
import StringToHTML from '@/components/serializer/stringToHTML'
import { Stakeholder as StakeholderType } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'

import { Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'
import ArticoliTagsList from '@/components/articoli/tagsList'
import CardGrid from '@/components/card/wrappers/cardsSwiper'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = await loadDb()
  const stakeholders = await db.find({
    collection: 'stakeholders',
    depth: 2,
  })

  const stakeholderData = stakeholders.docs.find((s) => s.id === params.slug)

  if (!stakeholderData) {
    return {
      title: 'Stakeholder non trovato | Morigerati',
    }
  }

  const metaImage = stakeholderData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: stakeholderData?.meta?.title ?? stakeholderData.nome ?? 'Morigerati',
    description: stakeholderData?.meta?.description || undefined,
    openGraph: {
      title: stakeholderData?.meta?.title ?? stakeholderData.nome ?? 'Morigerati',
      description: stakeholderData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/stakeholders/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: stakeholderData?.meta?.title ?? stakeholderData.nome ?? 'Morigerati',
      description: stakeholderData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Stakeholder({ params }: { params: { slug: string } }) {
  const db = await loadDb()

  // Get stakeholder
  const stakeholders = await db.find({
    collection: 'stakeholders',
    depth: 2,
  })

  const stakeholderData = stakeholders.docs.find((s) => s.id === params.slug)

  if (!stakeholderData) {
    notFound()
  }

  // Get all itinerari
  const allItinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
  })

  // Filter itinerari that have this stakeholder
  const itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
    itinerario.stakeholders?.some((s) =>
      typeof s === 'string' ? s === stakeholderData.id : s.id === stakeholderData.id,
    ),
  )

  const position: LatLngTuple = stakeholderData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="">
      {stakeholderData.copertina && (
        <Copertina copertina={stakeholderData.copertina as Media | undefined} />
      )}

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <BackButton />
        <div className="pt-4"></div>

        {/* Grid container for desktop layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-8">
          {/* Left column: Content */}
          <div>
            {/* Tags */}
            {stakeholderData.tipologia && (
              <div className="pt-4">
                <ArticoliTagsList
                  tags={
                    Array.isArray(stakeholderData.tipologia)
                      ? stakeholderData.tipologia
                      : [stakeholderData.tipologia]
                  }
                />
              </div>
            )}

            {/* Nome e tipologia */}
            <div className="mb-6">
              {stakeholderData.nome && (
                <h1 className="text-4xl text-stakeholderColorScuro font-bold mb-4">
                  {stakeholderData.nome}
                </h1>
              )}
            </div>

            {/* Testo descrittivo */}
            {stakeholderData.testo && stakeholderData.testo.root && (
              <div className="mb-6">
                <StringToHTML htmlString={stakeholderData.testo_html ?? ''} />
              </div>
            )}

            {/* Contatti */}
            {stakeholderData.contatti && stakeholderData.contatti.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Contatti</h2>
                <ul className="space-y-4">
                  {stakeholderData.contatti.map((contatto, index) => (
                    <li
                      key={index}
                      className="pb-4 last:pb-0"
                    >
                      <p className="font-medium text-lg mb-2">{contatto.nome}</p>
                      {contatto.telefono && (
                        <p className="text-sm mb-1">
                          <span className="font-medium">Telefono:</span> {contatto.telefono}
                        </p>
                      )}
                      {contatto.email && (
                        <p className="text-sm mb-1">
                          <span className="font-medium">Email:</span> {contatto.email}
                        </p>
                      )}
                      {contatto.link && (
                        <p className="text-sm">
                          <span className="font-medium">Link:</span>{' '}
                          <a
                            href={contatto.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {contatto.link}
                          </a>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column: Map */}
          <div className="lg:order-2">
            <div className="h-[500px] lg:sticky lg:top-4 flex items-center justify-center">
              <DynamicMappa initialPosition={position} initialZoom={14} showPositionPin={true} />
            </div>
          </div>
        </div>

        {/* Galleria */}
        {stakeholderData.galleria && stakeholderData.galleria.length > 0 && (
          <div className="mt-8">
            <Galleria items={stakeholderData.galleria as Media[] | undefined} />
          </div>
        )}

        {/* Itinerari correlati */}
        {itinerariCorrelati && itinerariCorrelati.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl text-center font-semibold mb-6">
              In quale itinerario potrai trovarci
            </h2>
            <CardGrid items={itinerariCorrelati} category="itinerari" />
          </div>
        )}
      </div>
    </div>
  )
}
