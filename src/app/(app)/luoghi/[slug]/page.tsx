import React from 'react'
import Image from 'next/image'

import { findCollection } from '@/utils/fetch'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MediaData {
  url: string
}

interface TextNode {
  text: string
  type: string
  version: number
  detail?: number
  format?: number
  mode?: string
  style?: string
}

interface RootNode {
  children: Array<{
    children: Array<TextNode>
    direction: string | null
    format: string
    type: string
    textFormat?: number
    tag?: string
  }>
}

interface ServizioData {
  nome: string
  testo: {
    root: RootNode
  }
  id: string
}

interface LuogoData {
  id: string
  nome: string
  servizi: ServizioData[]
  contatti: any[]
  media: MediaData
  createdAt: string
  updatedAt: string
}

type PaginatedDocs<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: null | number
  nextPage?: null | number
}

function mapToLuogoData(data: Record<string, any>): LuogoData {
  return {
    id: data.id,
    nome: data.nome,
    servizi: data.servizi || [],
    contatti: data.contatti || [],
    media: data.media,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

async function getLuogoData(slug: string): Promise<LuogoData | null> {
  try {
    const collectionData: PaginatedDocs<Record<string, any>> = await findCollection({
      collection: 'luoghi',
    })
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
        <Image
          src={luogoData.media.url}
          alt="Fullscreen Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {luogoData.nome ? (
          <h1 className="text-4xl font-bold">{luogoData.nome}</h1>
        ) : (
          <p>Error loading statement data</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
