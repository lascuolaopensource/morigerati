import React from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'
import ItinerarioDetailsCard from '@/components/itinerarioDetailsCard'
import { ServiziCardWrapper } from '@/components/servizioCardWrapper'
import MySwiper from '@/components/mySwiper'

import renderContent from '@/utils/renderElement'
import { getMediaURL } from '@/utils/getMediaUrl'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Itinerario({ params }: { params: { slug: string } }) {
  const db = await loadDb()

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
    <div className="bg-white mx-auto max-w-xl">
      <div className="w-full h-[70vh] relative">
        {itinerarioData.media && itinerarioData.media && (
          <Image
            src={getMediaURL(itinerarioData.media)}
            alt={getMediaURL(itinerarioData.media)}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {itinerarioData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{itinerarioData.nome}</h1>
        ) : (
          <p>Error loading itinerario name</p>
        )}

        {itinerarioData.testo && itinerarioData.testo.root && (
          <div className="mb-6">{renderContent([itinerarioData.testo.root])}</div>
        )}

        <ItinerarioDetailsCard
          lunghezza={itinerarioData.lunghezza}
          tempo={itinerarioData.tempo}
          dislivello={itinerarioData.dislivello}
          difficolta={itinerarioData.difficolta}
          tipo={itinerarioData.tipo}
        />

        <ServiziCardWrapper servizi={itinerarioData.servizi} />

        <div className="my-8">
          <h2 className="font-bold pt-4 text-xl text-center pb-4">Luoghi che incontrerai</h2>
          <MySwiper items={itinerarioData.luoghi} color="bg-luogoColor" />
        </div>

        <div className="my-8">
          <h2 className="font-bold pt-4 text-xl text-center pb-4">Stakeholders</h2>
          <MySwiper items={itinerarioData.stakeholders} color="bg-stakeholderColor" />
        </div>

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
