import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'
import renderElement, { RootNode } from '@/utils/renderElement'
import { loadDb } from '@/utils/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ContactData {
  nome: string
  link?: string
  email?: string
  telefono?: string
  id: string
}

interface StakeholderData {
  id: string
  nome: string
  testo: {
    root: RootNode
  }
  contatti: ContactData[]
  media: {
    url: string
    alt: string
  }
}

type CollectionData = {
  docs: Array<StakeholderData>
}

// async function getStakeholderData(slug: string): Promise<StakeholderData | null> {
//   try {
//     const collectionData = (await findCollection({
//       collection: 'stakeholders',
//     })) as unknown as CollectionData
//     const matchingDoc = collectionData.docs.find((doc) => doc.id === slug)
//     if (matchingDoc) {
//       return matchingDoc
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
//   return null
// }

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

  const stakeholderData = stakeholders.docs[0]

  return (
    <div className="bg-white mx-auto max-w-xl">
      <pre>{JSON.stringify(stakeholders, null, 4)}</pre>
      {/* <Navbar backgroundColor="bg-stakeholderColor" currentPage="/stakeholders" />
      <div className="w-full h-[70vh] relative">
        {stakeholderData.media && stakeholderData.media.link && (
          <Image
            src={stakeholderData.media.url}
            alt={stakeholderData.media.alt || 'Stakeholder image'}
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
          <div className="mb-6">{renderElement([stakeholderData.testo.root])}</div>
        ) : (
          <p>Error loading stakeholder description</p>
        )}

        <h2 className="text-2xl font-semibold mb-2">Contatti</h2>
        {stakeholderData.contatti.length > 0 ? (
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
      <Footer /> */}
    </div>
  )
}
