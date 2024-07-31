import React from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'
import renderContent from '@/utils/renderElement'
import { getMediaURL } from '@/utils/getMediaUrl'

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
    <div className="bg-white mx-auto max-w-xl">
      <div className="w-full h-[70vh] relative">
        {luogoData.media && (
          <Image
            src={getMediaURL(luogoData.media)}
            alt="Fullscreen Image"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {luogoData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{luogoData.nome}</h1>
        ) : (
          <p>Error loading luogo title</p>
        )}
        {luogoData.testo && luogoData.testo.root ? (
          <div className="mb-6">{renderContent([luogoData.testo.root])}</div>
        ) : (
          <p>Error loading luogo description</p>
        )}

        <h2 className="text-2xl font-semibold">Servizi</h2>
        {luogoData.servizi && luogoData.servizi.length > 0 ? (
          luogoData.servizi.map((servizio, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-semibold ">{servizio.nome}</h3>
              {servizio.testo && servizio.testo.root ? (
                renderContent([servizio.testo.root])
              ) : (
                <p>Error loading servizio data</p>
              )}
            </div>
          ))
        ) : (
          <p>Nessun servizio disponibile</p>
        )}

        <div className="pb-4"></div>
        <h2 className="text-2xl font-semibold mb-2">Contatti</h2>
        {luogoData.contatti && luogoData.contatti.length > 0 ? (
          <ul className="mb-6">
            {luogoData.contatti.map((contatto, index) => (
              <li key={index} className="mb-2">
                <strong>{contatto.nome}</strong>
                {contatto.telefono && <p>Telefono: {contatto.telefono}</p>}
                {contatto.email && <p>Email: {contatto.email}</p>}
                {contatto.link && (
                  <p>
                    Link:{' '}
                    <a href={contatto.link} target="_blank" rel="noopener noreferrer">
                      {contatto.link}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-6">Nessun contatto disponibile</p>
        )}

        <h2 className="text-2xl font-semibold mb-2">Orari</h2>
        {luogoData.orari && luogoData.orari.root ? (
          <div className="mb-6">{renderContent(luogoData.orari.root)}</div>
        ) : (
          <p className="mb-6">Orari non disponibili</p>
        )}
      </div>
    </div>
  )
}
