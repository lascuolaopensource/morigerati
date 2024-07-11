import React, { Suspense } from 'react'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import { findCollection } from '@/utils/fetch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MediaData {
  id: string
  alt: string
  Nome?: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
  createdAt: string
  updatedAt: string
  url: string
  thumbnailURL: string | null
}

interface LuogoData {
  id: string
  nome: string
  servizi: any[]
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

const Luogo = async ({ params }: { params: { slug: string } }) => {
  let luogoData: LuogoData | null = null
  try {
    const collectionData: PaginatedDocs<Record<string, any>> = await findCollection({
      collection: 'luoghi',
    })
    const matchingDoc = collectionData.docs.find((doc) => doc.id === params.slug)
    if (matchingDoc) {
      luogoData = mapToLuogoData(matchingDoc)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  if (!luogoData) {
    return <div>Luogo non trovato</div>
  }

  return (
    <div>
      <Navbar backgroundColor="bg-luogoColor" currentPage="/luoghi" />
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold mb-4">{luogoData.nome}</h1>
        {luogoData.media && (
          <img
            src={luogoData.media.url}
            alt={luogoData.media.alt}
            className="w-full max-w-md mx-auto mb-4"
          />
        )}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Servizi:</h2>
          {luogoData.servizi.length > 0 ? (
            <ul className="list-disc pl-5">
              {luogoData.servizi.map((servizio, index) => (
                <li key={index}>{JSON.stringify(servizio)}</li>
              ))}
            </ul>
          ) : (
            <p>Nessun servizio disponibile</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Contatti:</h2>
          {luogoData.contatti.length > 0 ? (
            <ul className="list-disc pl-5">
              {luogoData.contatti.map((contatto, index) => (
                <li key={index}>{JSON.stringify(contatto)}</li>
              ))}
            </ul>
          ) : (
            <p>Nessun contatto disponibile</p>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Creato il: {new Date(luogoData.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          Ultimo aggiornamento: {new Date(luogoData.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Luogo
