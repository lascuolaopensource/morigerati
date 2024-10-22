import React from 'react'
import Image from 'next/image'

import BackButton from '@/components/backButton'
import { loadDb } from '@/utils/db'
import StringToHTML from '@/components/serializer/stringToHTML'
import { getMediaURL } from '@/utils/getMediaUrl'
import { Stakeholder as StakeholderType } from '@/payload-types'

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

  return (
    <div className="">
      {stakeholderData.copertina && (
        <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
          <Image
            src={getMediaURL(stakeholderData.copertina)}
            alt="Fullscreen Image"
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
          />
          <div className="absolute inset-0 "></div>
        </div>
      )}

      <div className="p-4">
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
            <StringToHTML htmlString={stakeholderData.testo_html ?? ''} />
          </div>
        ) : (
          <p></p>
        )}

        {stakeholderData.contatti && stakeholderData.contatti.length > 0 ? (
          <h2 className="text-2xl font-semibold mb-2">Contatti</h2>
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
