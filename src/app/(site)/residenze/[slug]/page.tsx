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
    <div className="bg-white ">
      <Copertina copertina={residenzaData.copertina as Media | undefined} />
      <div className="p-4 sm:px-36 max-w-screen-xl mx-auto">
        <BackButton />
        <RandomPixel p={1} />
        <div className="pt-4"></div>
        {residenzaData.nome ? (
          <h1 className="text-4xl font-bold mb-4">{residenzaData.nome}</h1>
        ) : (
          <p></p>
        )}
        <StringToHTML htmlString={residenzaData.abstract_html ?? ''} />

        <div className="pb-2">
          {residenzaData.mostra_dettagli ? (
            <InfoResidenza
              residenza={residenzaData}
              onlyDate={isAfterCurrentDate(residenzaData?.data_inizio ?? '')}
            />
          ) : (
            <DateDaDefinireBanner />
          )}
        </div>
        <PulsanteIscrizione
          link={residenzaData.link_iscrizione ?? ''}
          show={residenzaData.mostra_pulsante_iscrizione ?? false}
        />
        {residenzaData.esperti && residenzaData.esperti.length > 0 && (
          <h2 className="text-center"> Esperti </h2>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {residenzaData.esperti &&
            residenzaData.esperti.map((esperto, index) => (
              <TutorCard key={index} esperto={esperto} />
            ))}
        </div>
        <Galleria items={residenzaData.galleria as Media[] | undefined} />
        <div className="p-4" />
        {!isArrayEmpty(residenzaData.programma) ? (
          <div>
            <h2>Programma</h2>
          </div>
        ) : null}

        <ProgrammaList residenza={residenzaData} />
        <p className="pt-4"></p>
        {residenzaData.info_html ? (
          <div>
            <StringToHTML htmlString={residenzaData.info_html ?? ''} />{' '}
          </div>
        ) : (
          ''
        )}
        <PulsanteIscrizione
          link={residenzaData.link_iscrizione ?? ''}
          show={residenzaData.mostra_pulsante_iscrizione ?? false}
        />
      </div>
    </div>
  )
}
