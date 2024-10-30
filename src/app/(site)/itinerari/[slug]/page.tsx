import React from 'react'
import { loadDb } from '@/utils/db'

import BackButton from '@/components/backButton'
import ItinerarioDetailsCard from '@/components/itinerarioDetailsCard'
import { ServiziCardWrapper } from '@/components/servizioCardWrapper'
import MySwiper from '@/components/mySwiper'
import Galleria from '@/components/galleria/galleria'

import StringToHTML from '@/components/serializer/stringToHTML'

import { getTracciatoUrl } from '@/utils/getTracciatoUrl'
import { Luoghi, Stakeholder } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/copertina'

import { type Media } from '@/payload-types'

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

      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {itinerarioData?.nome ? (
          <h1 className="text-4xl font-bold mb-4">{itinerarioData?.nome}</h1>
        ) : (
          <p></p>
        )}

        <div className="mb-6">
          <StringToHTML htmlString={itinerarioData?.testo_html ?? ''} />
        </div>
        <div className="bg-white-700 mx-auto my-5 w-[98%] h-[300px] z-0">
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
        <div className="pb-2" />
        <Galleria items={itinerarioData?.galleria as Media[] | undefined} />

        <ServiziCardWrapper servizi={itinerarioData?.servizi} />

        {itinerarioData?.luoghi && itinerarioData?.luoghi.length > 0 && (
          <div className="my-8">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">Luoghi che incontrerai</h2>
            <MySwiper
              items={itinerarioData?.luoghi as Luoghi[]}
              color="bg-luogoColor"
              type="luoghi"
            />
          </div>
        )}

        {itinerarioData?.stakeholders && itinerarioData?.stakeholders.length > 0 && (
          <div className="my-8">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">Stakeholders che troverai</h2>
            <MySwiper
              items={itinerarioData?.stakeholders as Stakeholder[]}
              color="bg-stakeholderColor"
              type="stakeholders"
            />
          </div>
        )}
      </div>
    </div>
  )
}
