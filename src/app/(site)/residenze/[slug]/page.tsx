import React, { Suspense } from 'react'

import { loadDb } from '@/utils/db'
import BackButton from '@/components/backButton'

import { isArrayEmpty } from '@/utils/isArrayEmpty'
import ProgrammaList from '@/components/residenze/programmaList'
import DateDaDefinireBanner from '@/components/residenze/annuncio'

import StringToHTML from '@/components/serializer/stringToHTML'

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
  const residenzaData = residenza.docs[0]

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
      <DateDaDefinireBanner linkText="questa pagina!" linkUrl={'www.google.com'} />
      {!isArrayEmpty(residenzaData.programma) ? (
        <div>
          <line className="border-t-2 my-4"></line>
          <h2>Programma</h2>
        </div>
      ) : (
        ''
      )}
      <ProgrammaList residenza={residenzaData} />
    </div>
  )
}
