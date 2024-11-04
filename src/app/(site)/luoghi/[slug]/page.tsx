import React, { Suspense } from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import MySwyper from '@/components/polaroid/mySwiper'
import { RandomPixel } from '@/components/uiElements/pixels'

import Copertina from '@/components/uiElements/copertina'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'

import StringToHTML from '@/components/serializer/stringToHTML'
import { Itinerari, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Luogo({ params }: { params: { slug: string } }) {
  const db = await loadDb()
  const luogo = await db.find({
    collection: 'luoghi',
    where: {
      id: {
        equals: params.slug,
      },
    },
  })
  const luogoData = luogo.docs[0]

  const position: LatLngTuple = luogoData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="bg-white">
      <Copertina copertina={luogoData?.copertina as Media | undefined} />

      <div className="p-4">
        <BackButton />
        <RandomPixel p={3} />
        <div className="pt-4"></div>
        {luogoData.nome ? <h1 className="text-4xl font-bold mb-4">{luogoData.nome}</h1> : <p></p>}
        <StringToHTML htmlString={luogoData.testo_html ?? ''} />
        <div className="bg-white-700 mx-auto my-5 w-[98%] h-[300px] z-0">
          <DynamicMappa initialPosition={position} initialZoom={40} showPositionPin={true} />
        </div>
        {luogoData.Itinerari_relation && luogoData.Itinerari_relation.length > 0 ? (
          <h2 className="text-center">In quale itinerario potrai trovarci</h2>
        ) : (
          ''
        )}
        {
          <Suspense fallback={<div>Loading slides...</div>}>
            <MySwyper
              items={luogoData.Itinerari_relation as Itinerari[]}
              color="bg-itinerarioColor"
              type="itinerari"
            />
          </Suspense>
        }

        {luogoData.servizi && luogoData.servizi.length > 0 ? (
          <h2 className="text-center pt-6">Servizi</h2>
        ) : (
          <div></div>
        )}

        {luogoData.servizi && luogoData.servizi.length > 0 ? (
          luogoData.servizi.map((servizio, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-xl">{servizio.nome}</h4>
              <StringToHTML htmlString={servizio.testo_html ?? ''} />
            </div>
          ))
        ) : (
          <p></p>
        )}
        <div className="pb-8"></div>

        {luogoData.contatti && luogoData.contatti.length > 0 ? (
          <h2 className="mb-2 ">Contatti:</h2>
        ) : (
          <div></div>
        )}

        {luogoData.contatti && luogoData.contatti.length > 0 ? (
          <ul className="mb-6">
            {luogoData.contatti.map((contatto, index) => (
              <li key={index} className="mb-2">
                <p>{contatto.nome}</p>
                {contatto.telefono && <p className="text-xs">Telefono: {contatto.telefono}</p>}
                {contatto.email && <p className="text-xs">Email: {contatto.email}</p>}
                {contatto.link && (
                  <p className="text-xs">
                    Link:{' '}
                    <a
                      className="text-xs"
                      href={contatto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contatto.link}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-6"></p>
        )}

        {isRichTextEmpty(luogoData.orari) ? <div></div> : <h2>Orari di Apertura:</h2>}

        {luogoData.orari && luogoData.orari.root ? (
          <StringToHTML htmlString={luogoData.orari_html ?? ''} />
        ) : (
          <p className="mb-6"> </p>
        )}
      </div>
    </div>
  )
}
