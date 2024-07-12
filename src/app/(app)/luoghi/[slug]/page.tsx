import React from 'react'
import Image from 'next/image'
import { findCollection } from '@/utils/fetch'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'
import renderElement, { RootNode } from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface LuogoData {
  id: string
  nome: string
  servizi: ServizioData[]
  contatti: any[]
  media: { url: string }
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
    servizi?: Array<{
      nome: string
      testo: {
        root: RootNode
      }
    }>
    contatti?: any[]
    media?: { url: string }
    [key: string]: any
  }>
}

function mapToLuogoData(data: CollectionData['docs'][0]): LuogoData {
  return {
    id: data.id,
    nome: data.nome,
    servizi: data.servizi || [],
    contatti: data.contatti || [],
    media: data.media || { url: '' },
  }
}

async function getLuogoData(slug: string): Promise<LuogoData | null> {
  try {
    const collectionData = (await findCollection({
      collection: 'luoghi',
    })) as CollectionData

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
    <div className="bg-white">
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
          <h1 className="text-4xl font-bold">{luogoData.nome}</h1>
        ) : (
          <p>Error loading luogo title</p>
        )}
        <div className="pt-4"></div>
        {luogoData.servizi.map((servizio, index) => (
          <div key={index}>
            {servizio.testo && servizio.testo.root ? (
              renderElement([servizio.testo.root])
            ) : (
              <p>Error loading servizio data</p>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}
