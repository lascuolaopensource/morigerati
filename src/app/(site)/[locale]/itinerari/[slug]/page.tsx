//Boilerplate
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
//DB
import { loadDb } from '@/modules/utils/db'
import type { Luoghi, Persone } from '@/payload-types'
import type { Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
//Components
import ItinerarioDetailsCard from './_partials/itinerarioDetailsCard'
import Galleria from '@/modules/components/galleria/galleria'
import DynamicMappa from '@/modules/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/modules/components/uiElements/copertina'
import MediaViewer from '@/modules/components/uiElements/mediaViewer'
import { getTracciatoUrl } from '@/modules/utils/getTracciatoUrl'
//Locale
import { getMessages } from 'next-intl/server'
import { DetailPageHeading } from '@/modules/components/pageLayout/detailPageHeading'
import { Container } from '@/modules/components/uiElements/container'
import { ServiziSection } from '@/modules/components/uiElements/serviziSection'
import PixelBorder from '@/modules/components/uiElements/pixelBorder'
import { getLocale } from '@/modules/i18n'
import { createMetadata } from '@/modules/seo'
import { getMedia, getMediaArray } from '@/modules/utils'
import { appConfig } from '@/app-config'

//

export const dynamic = 'force-dynamic'
export const revalidate = 0

//

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function load(pageProps: PageProps) {
  const slug = (await pageProps.params).slug
  const locale = await getLocale()
  const db = await loadDb()
  const { docs } = await db.find({
    collection: 'itinerari',
    depth: 2,
    locale,
    where: { slug: { equals: slug } },
  })
  return { itinerario: docs.at(0), locale, db, slug }
}

export default async function Itinerario(pageProps: PageProps) {
  const { itinerario } = await load(pageProps)
  if (!itinerario) notFound()

  const messages = await getMessages()

  const position = appConfig.coordinateMorigerati as LatLngTuple
  const galleryItems = getMediaArray(itinerario.galleria)

  return (
    <>
      <Copertina copertina={itinerario.copertina as Media} />

      <DetailPageHeading
        title={itinerario.nome}
        collection="itinerari"
        backButton={{
          href: '/itinerari',
          message: messages.backButton.itinerari,
        }}
        mapProps={{
          gpxUrl: getTracciatoUrl(itinerario?.tracciato_gpx),
          showGpxDownload: true,
        }}
      >
        <ItinerarioDetailsCard
          lunghezza={itinerario.lunghezza}
          tempo={itinerario.tempo}
          dislivello={itinerario.dislivello}
          difficolta={itinerario.difficolta}
          tipo={itinerario.tipo}
        />
      </DetailPageHeading>

      <Container className="max-w-prose space-y-8">
        {itinerario?.Video && (
          <div className="rounded-md overflow-hidden">
            <MediaViewer media={itinerario.Video as Media} />
          </div>
        )}

        <RichText data={itinerario.testo as SerializedEditorState} className="prose md:prose-lg" />

        <ServiziSection servizi={itinerario.servizi} collection="itinerari" />

        {/* TODO - Review this section */}
        {/* Content below the two columns */}
        {/* <div className="">
        {itinerario?.persone && itinerario?.persone.length > 0 && (
          <div className="">
            <h2 className="font-bold text-xl text-center pb-4">{peopleTitle}</h2>
            <CardGrid items={itinerario?.persone as Persone[]} category="persone" singleRow />
          </div>
        )}

        {itinerario?.luoghi && itinerario?.luoghi.length > 0 && (
          <div className="">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">{placesTitle}</h2>
            <CardGrid items={itinerario?.luoghi as Luoghi[]} category="luoghi" singleRow />
          </div>
        )}
      </div> */}
      </Container>

      <div>
        <PixelBorder className="bg-itinerariColor" />
        <div className="bg-itinerariColor">
          <Container className="space-y-6">
            <p className="text-center text-3xl font-bold text-white">Scopri il percorso!</p>
            <div className="h-[600px]">
              <DynamicMappa
                initialPosition={position}
                initialZoom={14}
                gpxUrl={getTracciatoUrl(itinerario.tracciato_gpx)}
                localizedMedia={itinerario.media_geolocalizzati}
              />
            </div>

            {galleryItems.length > 0 && <Galleria items={galleryItems} />}
          </Container>
        </div>
      </div>
    </>
  )
}

export async function generateMetadata(pageProps: PageProps): Promise<Metadata> {
  const { itinerario, locale, slug } = await load(pageProps)

  return createMetadata({
    doc: itinerario,
    pathname: `itinerari/${slug}`,
    locale,
  })
}

//

// TODO - Review related content
// const peopleTitle =
//   messages?.common?.itinerari?.peopleYouWillFind ||
//   (locale === 'it' ? 'Persone che troverai' : 'People you will find')
// const placesTitle =
//   messages?.common?.itinerari?.placesYouWillVisit ||
//   (locale === 'it' ? 'Luoghi che incontrerai' : 'Places you will visit')
