import React from 'react'
import { loadDb } from '@/utils/db'

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

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Itinerario({ params }: { params: { slug: string } }) {
  const db = await loadDb()

  const position: LatLngTuple = [40.139949, 15.555182]

  const itinerario = await db.find({
    collection: 'itinerari',
    where: {
      id: {
        equals: params.slug,
      },
    },
    depth: 2,
  })

  const itinerarioData = itinerario.docs[0]

  return (
    <div className="bg-white">
      <Copertina copertina={itinerarioData?.copertina as Media | undefined} />

      <div className="p-4 sm:px-36 max-w-screen-xl mx-auto">
        <BackButton />
        <RandomPixel p={2} />
        <div className="pt-4"></div>
        {itinerarioData?.nome ? (
          <h1 className="text-4xl font-bold mb-4">{itinerarioData?.nome}</h1>
        ) : (
          <p></p>
        )}

        <div className="mb-6">
          <StringToHTML htmlString={itinerarioData?.testo_html ?? ''} />
        </div>
        <div className="bg-white-700 mx-auto my-5 w-[98%] z-0">
          <DynamicMappa
            initialPosition={position}
            initialZoom={14}
            gpxUrl={getTracciatoUrl(itinerarioData?.tracciato_gpx)}
            localizedMedia={itinerarioData?.media_geolocalizzati}
          />
        </div>

        <ItinerarioDetailsCard
          lunghezza={itinerarioData?.lunghezza}
          tempo={itinerarioData?.tempo}
          dislivello={itinerarioData?.dislivello}
          difficolta={itinerarioData?.difficolta}
          tipo={itinerarioData?.tipo}
        />

        <div className="">
          <MediaViewer media={(itinerarioData?.Video as Media) || undefined} />
        </div>
        <div className="pb-2" />
        <Galleria items={itinerarioData?.galleria as Media[] | undefined} />

        <ServiziCardWrapper servizi={itinerarioData?.servizi} />

        {itinerarioData?.luoghi && itinerarioData?.luoghi.length > 0 && (
          <div className="my-8">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">Luoghi che incontrerai</h2>
            <MySwiper items={itinerarioData?.luoghi as Luoghi[]} category="luoghi" />
          </div>
        )}

        {itinerarioData?.stakeholders && itinerarioData?.stakeholders.length > 0 && (
          <div className="my-8">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">Stakeholders che troverai</h2>
            <MySwiper
              items={itinerarioData?.stakeholders as Stakeholder[]}
              category="stakeholders"
            />
          </div>
        )}
      </div>
    </div>
  )
}
