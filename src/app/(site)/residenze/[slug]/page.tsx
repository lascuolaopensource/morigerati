import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/backButton'
import { isArrayEmpty } from '@/utils/isArrayEmpty'
import ProgrammaList from '@/components/residenze/programmaList'
import DateDaDefinireBanner from '@/components/residenze/annuncio'
import StringToHTML from '@/components/serializer/stringToHTML'
import TutorCard from '@/components/residenze/espertiCard'
import { Residenze } from '@/payload-types'
import InfoResidenza from '@/components/residenze/infoResidenza'
import PulsanteIscrizione from '@/components/residenze/pulsanteIscrizione'

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
  return (
    <div className="bg-white p-4">
      <BackButton />
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
            onlyDate={residenzaData.mostra_solo_data as Boolean}
          />
        ) : (
          <DateDaDefinireBanner />
        )}
      </div>
      {residenzaData.esperti && residenzaData.esperti.length > 0 && (
        <h2 className="text-center"> Esperti </h2>
      )}
      <PulsanteIscrizione
        link={residenzaData.link_iscrizione ?? ''}
        show={residenzaData.mostra_pulsante_iscrizione ?? false}
      />
      <div className="grid gap-6">
        {residenzaData.esperti &&
          residenzaData.esperti.map((esperto, index) => (
            <TutorCard key={index} esperto={esperto} />
          ))}
      </div>
      {!isArrayEmpty(residenzaData.programma) ? (
        <div>
          <h2>Programma</h2>
        </div>
      ) : null}
      <ProgrammaList residenza={residenzaData} />
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
  )
}
