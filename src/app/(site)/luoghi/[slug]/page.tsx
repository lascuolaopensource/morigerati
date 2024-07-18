import React from 'react'
import Image from 'next/image'
import { findCollection } from '@/utils/fetch'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'
import renderElement, { RootNode } from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ContactData {
  nome: string
  link?: string
  email?: string
  telefono?: string
  id: string
}

interface LuogoData {
  id: string
  nome: string
  testo: {
    root: RootNode
  }
  servizi: ServizioData[]
  contatti: ContactData[]
  media: { url: string }
  orari: {
    root: RootNode
  }
}

interface ServizioData {
  nome: string
  testo: {
    root: RootNode
  }
}

type CollectionData = {
  docs: Array<{
    id: string
    nome: string
    testo: {
      root: RootNode
    }
    servizi?: ServizioData[]
    contatti?: ContactData[]
    media?: { url: string }
    orari: {
      root: RootNode
    }
    [key: string]: any
  }>
}

function mapToLuogoData(data: CollectionData['docs'][0]): LuogoData {
  return {
    id: data.id,
    nome: data.nome,
    testo: data.testo,
    servizi: data.servizi || [],
    contatti: data.contatti || [],
    media: data.media || { url: '' },
    orari: data.orari,
  }
}

async function getLuogoData(slug: string): Promise<LuogoData | null> {
  try {
    const collectionData = (await findCollection({
      collection: 'luoghi',
    })) as unknown as CollectionData
    const matchingDoc = collectionData.docs.find((doc) => doc.id === slug)
    if (matchingDoc) {
      return mapToLuogoData(matchingDoc)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  return null
}

export default async function Luogo({ params }: { params: { slug: string } }) {
  const luogoData = await getLuogoData(params.slug)
  if (!luogoData) {
    return <div>Luogo non trovato</div>
  }

  return (
    <div className="bg-white mx-auto max-w-xl">
      <Navbar backgroundColor="bg-luogoColor" currentPage="/luoghi" />
      <div className="w-full h-[70vh] relative">
        {luogoData.media && luogoData.media.url && (
          <Image
            src={luogoData.media.url}
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
          <div className="mb-6">{renderElement([luogoData.testo.root])}</div>
        ) : (
          <p>Error loading luogo description</p>
        )}

        <h2 className="text-2xl font-semibold">Servizi</h2>
        {luogoData.servizi.map((servizio, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-xl font-semibold ">{servizio.nome}</h3>
            {servizio.testo && servizio.testo.root ? (
              renderElement([servizio.testo.root])
            ) : (
              <p>Error loading servizio data</p>
            )}
          </div>
        ))}
        <div className="pb-4"></div>
        <h2 className="text-2xl font-semibold mb-2">Contatti</h2>
        {luogoData.contatti.length > 0 ? (
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
          <div className="mb-6">{renderElement([luogoData.orari.root])}</div>
        ) : (
          <p className="mb-6">Orari non disponibili</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
