import React from 'react'
import Image from 'next/image'

import BackButton from '@/components/backButton'
import { loadDb } from '@/utils/db'
import renderContent from '@/utils/renderElement'
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
    <div className="bg-white mx-auto max-w-xl">
      <div className="w-full h-[70vh] relative">
        {stakeholderData.media && (
          <Image
            src={getMediaURL(stakeholderData.media)}
            alt={stakeholderData.nome || 'Stakeholder image'}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {stakeholderData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{stakeholderData.nome}</h1>
        ) : (
          <p>Error loading stakeholder name</p>
        )}
        {stakeholderData.testo && stakeholderData.testo.root ? (
          <div className="mb-6">{renderContent([stakeholderData.testo.root])}</div>
        ) : (
          <p>Error loading stakeholder description</p>
        )}
        <h2 className="text-2xl font-semibold mb-2">Contatti</h2>
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
          <p className="mb-6">Nessun contatto disponibile</p>
        )}
      </div>
    </div>
  )
}
