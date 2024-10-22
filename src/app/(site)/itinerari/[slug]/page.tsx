import React from 'react'
import Image from 'next/image'
import { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import { LatLngTuple } from 'leaflet'

import BackButton from '@/components/backButton'
import ItinerarioDetailsCard from '@/components/itinerarioDetailsCard'
import { ServiziCardWrapper } from '@/components/servizioCardWrapper'
import MySwiper from '@/components/mySwiper'
import Galleria from '@/components/galleria/galleria'

import loremPic from '@/public/loremPic.png'

import StringToHTML from '@/components/serializer/stringToHTML'

import { getMediaURL } from '@/utils/getMediaUrl'
import { getTracciatoUrl } from '@/utils/getTracciatoUrl'
import { Luoghi, Stakeholder } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'

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

  const copertina = getMediaURL(itinerarioData.copertina)

  console.log(copertina)
  console.log('weeee')

  return (
    <div className="bg-white">
      <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
        <Image
          src={copertina}
          alt="Fullscreen Image"
          layout="fill"
          fill
          style={{ objectFit: 'cover' }}
          objectFit="cover"
          className="w-full h-full"
        />

        <div className="absolute inset-0 "></div>
      </div>

      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {itinerarioData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{itinerarioData.nome}</h1>
        ) : (
          <p></p>
        )}

        <div className="mb-6">
          <StringToHTML htmlString={itinerarioData.testo_html ?? ''} />
        </div>
        <div className="bg-white-700 mx-auto my-5 w-[98%] h-[200px]">
          <DynamicMappa
            initialPosition={position}
            initialZoom={14}
            gpxUrl={getTracciatoUrl(itinerarioData.tracciato_gpx)}
            localizedMedia={itinerarioData.media_geolocalizzati}
          />
        </div>
        <ItinerarioDetailsCard
          lunghezza={itinerarioData.lunghezza}
          tempo={itinerarioData.tempo}
          dislivello={itinerarioData.dislivello}
          difficolta={itinerarioData.difficolta}
          tipo={itinerarioData.tipo}
        />
        <div className="pb-2" />
        <Galleria items={itinerarioData.galleria} />

        <ServiziCardWrapper servizi={itinerarioData.servizi} />

        {itinerarioData.luoghi && itinerarioData.luoghi.length > 0 && (
          <div className="my-8">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">Luoghi che incontrerai</h2>
            <MySwiper
              items={itinerarioData.luoghi as Luoghi[]}
              color="bg-luogoColor"
              type="luoghi"
            />
          </div>
        )}

        {itinerarioData.stakeholders && itinerarioData.stakeholders.length > 0 && (
          <div className="my-8">
            <h2 className="font-bold pt-4 text-xl text-center pb-4">Stakeholders che troverai</h2>
            <MySwiper
              items={itinerarioData.stakeholders as Stakeholder[]}
              color="bg-stakeholderColor"
              type="stakeholders"
            />
          </div>
        )}

        {itinerarioData.media_geolocalizzati && itinerarioData.media_geolocalizzati.length > 0 && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Media geolocalizzati</h2>
            <p>Disponibili {itinerarioData.media_geolocalizzati.length} media geolocalizzati</p>
          </div>
        )}
      </div>
    </div>
  )
}
