import React from 'react'

import BackButton from '@/components/uiElements/backButton'
import { loadDb } from '@/utils/db'
import StringToHTML from '@/components/serializer/stringToHTML'
import { Stakeholder as StakeholderType } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'

import { Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'

import ArticoliTagsList from '@/components/articoli/tagsList'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Stakeholder({ params }: { params: { slug: string } }) {
  const db = await loadDb()
  const stakeholders = await db.find({
    collection: 'stakeholders',
    where: {
      id: {
        equals: params.slug,
      },
    },
    depth: 1,
  })
  const stakeholderData = stakeholders.docs[0] as StakeholderType

  const position: LatLngTuple = stakeholderData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="">
      {stakeholderData.copertina && (
        <Copertina copertina={stakeholderData.copertina as Media | undefined} />
      )}

      <div className="p-4 sm:px-36 max-w-screen-xl mx-auto">
        <BackButton />
        <div className="pt-4"></div>
        {stakeholderData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{stakeholderData.nome}</h1>
        ) : (
          <p></p>
        )}
        {stakeholderData.testo && stakeholderData.testo.root ? (
          <div className="mb-6">
            {' '}
            {stakeholderData.tipologia ? (
              <p className="inline border-2 border-black pt-2 px-2">{stakeholderData.tipologia}</p>
            ) : null}
            <div className="pt-4" />
            <StringToHTML htmlString={stakeholderData.testo_html ?? ''} />
          </div>
        ) : (
          <p></p>
        )}
        <div className="bg-white-700 mx-auto my-5 w-[98%] h-[300px] z-0">
          <DynamicMappa initialPosition={position} initialZoom={40} showPositionPin={true} />
        </div>
        <Galleria items={stakeholderData.galleria as Media[] | undefined} />
        {stakeholderData.contatti && stakeholderData.contatti.length > 0 ? (
          <h2 className="text-2xl font-semibold mb-2 pt-20 sm:text-center">Contatti</h2>
        ) : (
          <div></div>
        )}
        {stakeholderData.contatti && stakeholderData.contatti.length > 0 ? (
          <ul className="mb-6">
            {stakeholderData.contatti.map((contatto, index) => (
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
          <p className="mb-6"></p>
        )}
      </div>
    </div>
  )
}
