import React from 'react'
import Image from 'next/image'
import { findCollection } from '@/utils/fetch'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackButton from '@/components/backButton'
import ItinerarioDetailsCard from '@/components/itinerarioDetailsCard'
import ServiziWrapper from '@/components/servizioCardWrapper'
import MySwiper from '@/components/mySwiper'
import renderElement, { RootNode } from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MediaData {
  id: string
  alt: string
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

interface Servizio {
  id: string
  nome: string
  // Add other properties as needed
}

interface ItinerarioData {
  id: string
  nome: string
  tipo: string[]
  servizi: Servizio[]
  media_geolocalizzati: any[]
  media: MediaData
  testo: {
    root: RootNode
  }
  difficolta: string
  dislivello: string
  lunghezza: number
  tempo: number
  createdAt: string
  updatedAt: string
  luoghi?: any[]
  stakeholders?: any[]
}

type CollectionData = {
  docs: Array<ItinerarioData>
}

async function getItinerarioData(slug: string): Promise<ItinerarioData | null> {
  try {
    const collectionData = (await findCollection({
      collection: 'itinerari',
    })) as unknown as CollectionData
    const matchingDoc = collectionData.docs.find((doc) => doc.id === slug)
    if (matchingDoc) {
      return matchingDoc
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  return null
}

async function getLuoghiData(): Promise<any[]> {
  try {
    const collectionData = await findCollection({ collection: 'luoghi' })
    return collectionData.docs || []
  } catch (error) {
    console.error('Error fetching luoghi data:', error)
    return []
  }
}

async function getStakeholdersData(): Promise<any[]> {
  try {
    const collectionData = await findCollection({ collection: 'stakeholders' })
    return collectionData.docs || []
  } catch (error) {
    console.error('Error fetching stakeholders data:', error)
    return []
  }
}

export default async function Itinerario({ params }: { params: { slug: string } }) {
  const itinerarioData = await getItinerarioData(params.slug)
  const luoghiData = await getLuoghiData()
  const stakeholdersData = await getStakeholdersData()
  if (!itinerarioData) {
    return <div>Itinerario non trovato</div>
  }

  return (
    <div className="bg-white mx-auto max-w-xl">
      <Navbar backgroundColor="bg-itinerarioColor" currentPage="/itinerari" />
      <div className="w-full h-[70vh] relative">
        {itinerarioData.media && itinerarioData.media.url && (
          <Image
            src={itinerarioData.media.url}
            alt={itinerarioData.media.alt || 'Immagine itinerario'}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {itinerarioData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{itinerarioData.nome}</h1>
        ) : (
          <p>Error loading itinerario name</p>
        )}

        {itinerarioData.testo && itinerarioData.testo.root && (
          <div className="mb-6">{renderElement([itinerarioData.testo.root])}</div>
        )}

        <ItinerarioDetailsCard
          lunghezza={itinerarioData.lunghezza}
          tempo={itinerarioData.tempo}
          dislivello={parseInt(itinerarioData.dislivello)}
          difficolta={itinerarioData.difficolta}
          tipo={itinerarioData.tipo}
        />

        <ServiziWrapper servizi={itinerarioData.servizi} />

        {/* Luoghi Carousel */}
        <div className="my-8">
          <h2 className="font-bold pt-4 text-xl text-center pb-4">Luoghi che incontrerai</h2>
          <MySwiper json={JSON.stringify({ docs: luoghiData })} color="bg-luogoColor" />
        </div>

        {/* Stakeholders Carousel */}
        <div className="my-8">
          <h2 className="font-bold pt-4 text-xl text-center pb-4">Stakeholders</h2>
          <MySwiper json={JSON.stringify({ docs: stakeholdersData })} color="bg-stakeholderColor" />
        </div>

        {itinerarioData.media_geolocalizzati && itinerarioData.media_geolocalizzati.length > 0 && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Media geolocalizzati</h2>
            <p>Disponibili {itinerarioData.media_geolocalizzati.length} media geolocalizzati</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
