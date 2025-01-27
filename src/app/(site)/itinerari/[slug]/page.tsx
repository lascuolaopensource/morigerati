import React from 'react'
import { loadDb } from '@/utils/db'
import { Metadata } from 'next'

import BackButton from '@/components/uiElements/backButton'
import ItinerarioDetailsCard from '@/components/itinerari/itinerarioDetailsCard'
import { ServiziCardWrapper } from '@/components/itinerari/servizioCardWrapper'
import MySwiper from '@/components/card/wrappers/cardsSwiper'
import Galleria from '@/components/galleria/galleria'

import StringToHTML from '@/components/serializer/stringToHTML'

import { getTracciatoUrl } from '@/utils/getTracciatoUrl'
import { Luoghi, Stakeholder } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'
import MediaViewer from '@/components/uiElements/mediaViewer'

import { type Media } from '@/payload-types'

import { RandomPixel } from '@/components/uiElements/pixels'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = await loadDb()
  const itinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
  })

  const itinerarioData = itinerari.docs.find((i) => i.id === params.slug)

  

  if (!itinerarioData) {
    return {
      title: 'Itinerario non trovato | Morigerati',
    }
  }

  const metaImage = itinerarioData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: itinerarioData?.meta?.title ?? itinerarioData.nome ?? 'Morigerati',
    description: itinerarioData?.meta?.description || undefined,
    openGraph: {
      title: itinerarioData?.meta?.title ?? itinerarioData.nome ?? 'Morigerati',
      description: itinerarioData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/itinerari/${params.slug}`,
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

export default async function Itinerario({ params }: { params: { slug: string } }) {
  const db = await loadDb()

  const position: LatLngTuple = [40.139949, 15.555182]

  const itinerario = await db.find({
    collection: 'itinerari',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    depth: 2,
  })

  const itinerarioData = itinerario.docs[0]

  const url = '/itinerari/' + itinerarioData.slug

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
              <h1 className="text-4xl text-itinerarioColorScuro font-bold mb-4">
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
              <StringToHTML htmlString={itinerarioData?.testo_html ?? ''} />
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
              <h2 className="font-bold text-xl text-center pb-4">Stakeholders che troverai</h2>
              <MySwiper
                items={itinerarioData?.stakeholders as Stakeholder[]}
                category="stakeholders"
              />
            </div>
          )}

          {itinerarioData?.luoghi && itinerarioData?.luoghi.length > 0 && (
            <div className="">
              <h2 className="font-bold pt-4 text-xl text-center pb-4">Luoghi che incontrerai</h2>
              <MySwiper items={itinerarioData?.luoghi as Luoghi[]} category="luoghi" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
