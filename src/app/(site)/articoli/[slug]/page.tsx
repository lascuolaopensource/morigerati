import React, { Suspense } from 'react'
import Image from 'next/image'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/backButton'
import renderContent from '@/utils/renderElement'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { getMediaURL } from '@/utils/getMediaUrl'

import StringToHTML from '@/components/serializer/stringToHTML'
import datePharser from '@/utils/datePharser'

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
        <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
          <Image
            src={getMediaURL(articoloData.copertina)}
            alt="Fullscreen Image"
            layout="fill"
            fill
            style={{ objectFit: 'cover' }}
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0"></div>
        </div>
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
