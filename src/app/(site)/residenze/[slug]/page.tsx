import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'
import { isArrayEmpty } from '@/utils/isArrayEmpty'
import ProgrammaList from '@/components/residenze/programmaList'
import DateDaDefinireBanner from '@/components/residenze/annuncio'
import TutorCard from '@/components/residenze/espertiCard'
import { Residenze } from '@/payload-types'
import InfoResidenza from '@/components/residenze/infoResidenza'
import PulsanteIscrizione from '@/components/residenze/pulsanteIscrizione'
import Copertina from '@/components/uiElements/copertina'
import { Media } from '@/payload-types'
import { RandomPixel } from '@/components/uiElements/pixels'
import Galleria from '@/components/galleria/galleria'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const db = await loadDb()
  const residenze = await db.find({
    collection: 'residenze',
    depth: 2,
  })

  const residenzaData = residenze.docs.find((r) => r.slug === slug)

  if (!residenzaData) {
    notFound()
    return {
      title: 'Residenza non trovata | Morigerati',
    }
  }

  const metaImage = residenzaData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: `${residenzaData.nome} | Morigerati`,
    description: residenzaData?.meta?.description,
    openGraph: {
      title: residenzaData?.meta?.title ?? residenzaData.nome ?? 'Morigerati',
      description: residenzaData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/residenze/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: residenzaData?.meta?.title ?? residenzaData.nome ?? 'Morigerati',
      description: residenzaData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export default async function ResidenzaSlug({ params }: { params: { slug: string } }) {
  const { slug } = params
  const db = await loadDb()
  const residenze = await db.find({
    collection: 'residenze',
    depth: 2,
  })

  const residenzaData = residenze.docs.find((r) => r.slug === slug)

  if (!residenzaData) {
    notFound()
  }

  const isAfterCurrentDate = (dateString: string): boolean => {
    const currentDate = new Date()
    const startDate = new Date(dateString)
    return currentDate > startDate
  }

  return (
    <div>
      <Copertina copertina={residenzaData.copertina as Media | undefined} />

      <div className="p-4 sm:px-6 lg:px-12 xl:px-16 max-w-[1400px] mx-auto">
        <BackButton />
        <div className="pt-8" />

        <div className="w-full max-w-[1200px] mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 min-w-[500px]">
              <div className="prose-custom-no-center">
                {residenzaData.nome && (
                  <h1 className="text-4xl font-bold !text-residenzeColor mb-4">
                    {residenzaData.nome}
                  </h1>
                )}

                {!isAfterCurrentDate(residenzaData?.data_inizio ?? '') && (
                  <RichText
                    data={residenzaData.abstract as SerializedEditorState}
                    className="prose prose-lg"
                  />
                )}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              {residenzaData.mostra_dettagli ? (
                <InfoResidenza
                  residenza={residenzaData}
                  onlyDate={isAfterCurrentDate(residenzaData?.data_inizio ?? '')}
                />
              ) : residenzaData.data_inizio && residenzaData.data_fine ? (
                <DateDaDefinireBanner />
              ) : null}
            </div>
          </div>

          {isAfterCurrentDate(residenzaData?.data_inizio ?? '') && (
            <div className="mt-12 max-w-[800px] mx-auto">
              <RichText
                data={residenzaData.abstract as SerializedEditorState}
                className="prose prose-lg"
              />
            </div>
          )}

          <div className="mt-12 max-w-[800px] mx-auto">
            <PulsanteIscrizione
              link={residenzaData.link_iscrizione ?? ''}
              show={residenzaData.mostra_pulsante_iscrizione ?? false}
            />
          </div>

          {residenzaData.descrizione && (
            <div className="max-w-[800px] mx-auto mt-16">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">
                Descrizione
              </h2>
              <RichText
                data={residenzaData.descrizione as SerializedEditorState}
                className="prose prose-lg"
              />
            </div>
          )}

          {!isArrayEmpty(residenzaData.programma) && (
            <div className="max-w-[800px] mx-auto mt-16">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">Programma</h2>
              <ProgrammaList residenza={residenzaData} />
            </div>
          )}

          {!isArrayEmpty(residenzaData.esperti) && (
            <div className="mt-16 w-full mx-auto">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">Esperti</h2>
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {residenzaData.esperti?.map((esperto, index) => (
                  <TutorCard key={index} esperto={esperto} />
                ))}
              </div>
            </div>
          )}

          {residenzaData.galleria && (
            <div className="mt-16 max-w-[800px] mx-auto">
              <Galleria
                items={residenzaData.galleria as Media[]}
                titleColor=" text-residenzeColor"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
