import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'

import { Media } from '@/payload-types'

import StringToHTML from '@/components/serializer/stringToHTML'
import datePharser from '@/utils/formatDate'
import Copertina from '@/components/uiElements/copertina'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Articolo({ params }: { params: { slug: string } }) {
  const db = await loadDb()
  const articolo = await db.find({
    collection: 'articoli',
    where: {
      id: {
        equals: params.slug,
      },
    },
    depth: 1,
  })
  const articoloData = articolo.docs[0]

  return (
    <div className="bg-white">
      {articoloData.copertina && (
        <Copertina copertina={articoloData.copertina as Media | undefined} />
      )}
      <div className="p-4">
        <BackButton />
        <div className="pt-4"></div>
        {articoloData.titolo ? (
          <h1 className="text-4xl font-bold mb-4">{articoloData.titolo}</h1>
        ) : (
          <p></p>
        )}
        <p>{datePharser(articoloData.data_pubblicazione, '', true)}</p>
      </div>
      <div className="container mx-auto p-4">
        <StringToHTML htmlString={articoloData.testo_html ?? ''} />
      </div>
    </div>
  )
}
