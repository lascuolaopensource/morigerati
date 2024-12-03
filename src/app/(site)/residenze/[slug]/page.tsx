import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'
import { isArrayEmpty } from '@/utils/isArrayEmpty'
import ProgrammaList from '@/components/residenze/programmaList'
import DateDaDefinireBanner from '@/components/residenze/annuncio'
import StringToHTML from '@/components/serializer/stringToHTML'
import TutorCard from '@/components/residenze/espertiCard'
import { Residenze } from '@/payload-types'
import InfoResidenza from '@/components/residenze/infoResidenza'
import PulsanteIscrizione from '@/components/residenze/pulsanteIscrizione'
import Copertina from '@/components/uiElements/copertina'
import { Media } from '@/payload-types'
import { RandomPixel } from '@/components/uiElements/pixels'
import Galleria from '@/components/galleria/galleria'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ResidenzaSlug({ params }: { params: { slug: string } }) {
  const db = await loadDb()
  const residenza = await db.find({
    collection: 'residenze',
    where: {
      id: {
        equals: params.slug,
      },
    },
    depth: 1,
  })
  const residenzaData = residenza.docs[0] as Residenze

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
                  <StringToHTML htmlString={residenzaData.abstract_html ?? ''} />
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
              <StringToHTML
                htmlString={residenzaData.abstract_html ?? ''}
                classs="prose-custom-justify"
              />
            </div>
          )}

          <div className="mt-12 max-w-[800px] mx-auto">
            <PulsanteIscrizione
              link={residenzaData.link_iscrizione ?? ''}
              show={residenzaData.mostra_pulsante_iscrizione ?? false}
            />
          </div>

          {residenzaData.info_html && (
            <div className="max-w-[800px] mx-auto mt-16">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">
                Descrizione
              </h2>
              <StringToHTML htmlString={residenzaData.info_html} classs="prose-custom-justify" />
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
