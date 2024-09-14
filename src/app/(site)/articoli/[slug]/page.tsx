import React, { Suspense } from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/backButton'
import renderContent from '@/utils/renderElement'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { getMediaURL } from '@/utils/getMediaUrl'
import MySwyper from '@/components/mySwiper'

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
    depth: 1,
  })
  const luogoData = luogo.docs[0]

  return (
    <div className="bg-white">
      {luogoData.media && (
        <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
          <Image
            src={getMediaURL(luogoData.media)}
            alt="Fullscreen Image"
            layout="fill"
            fill
            style={{ objectFit: 'cover' }}
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0"></div>
        </div>
      )}
      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {luogoData.nome ? <h1 className="text-4xl font-bold mb-4">{luogoData.nome}</h1> : <p></p>}
        {luogoData.testo && luogoData.testo.root ? (
          <div className="mb-6">{renderContent(luogoData.testo)}</div>
        ) : (
          <p></p>
        )}
        {/*         {
          <Suspense fallback={<div>Loading slides...</div>}>
            <MySwyper
              items={luogoData['Itinerari in cui si trovai il luogo']}
              color="bg-luogoColor"
              type="luoghi"
            />
          </Suspense>
        } */}

        {luogoData.servizi && luogoData.servizi.length > 0 ? (
          <h2 className="text-2xl font-semibold text-center">Servizi</h2>
        ) : (
          <div></div>
        )}

        {luogoData.servizi && luogoData.servizi.length > 0 ? (
          luogoData.servizi.map((servizio, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-semibold ">{servizio.nome}</h3>
              {servizio.testo && servizio.testo.root ? renderContent(servizio.testo) : <p></p>}
            </div>
          ))
        ) : (
          <p></p>
        )}
        <div className="pb-8"></div>

        {luogoData.contatti && luogoData.contatti.length > 0 ? (
          <h2 className="text-l font-semibold mb-2 ">Contatti:</h2>
        ) : (
          <div></div>
        )}

        {luogoData.contatti && luogoData.contatti.length > 0 ? (
          <ul className="mb-6">
            {luogoData.contatti.map((contatto, index) => (
              <li key={index} className="mb-2">
                <strong>{contatto.nome}</strong>
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

        {isRichTextEmpty(luogoData.orari) ? (
          <div></div>
        ) : (
          <h2 className="text-l font-semibold">Orari di Apertura:</h2>
        )}

        {luogoData.orari && luogoData.orari.root ? (
          <div className="mb-6">{renderContent(luogoData.orari)}</div>
        ) : (
          <p className="mb-6"> </p>
        )}
      </div>
    </div>
  )
}
