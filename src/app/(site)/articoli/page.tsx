import React, { Suspense, useState } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import ArticoliCardWrapper from '@/components/articoli/articoliGridWrapper'
import StringToHTML from '@/components/serializer/stringToHTML'
import { Articoli } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ArticoliPage = async () => {
  const payload = await getPayloadHMR({ config })

  const testi = await payload.findGlobal({
    slug: 'testi',
  })

  const articoliData = await payload.find({
    collection: 'articoli',
  })

  const articoli: Articoli[] = articoliData.docs

  const tags = articoli.flatMap((doc) => doc.tags?.map((tag) => tag.tag) ?? [])
  const uniqueTags = [...new Set(tags)]

  return (
    <main className="">
      <div className="bg-white p-3 pt-5">
        {testi.articoli.title && (
          <div className="font-normal text-sm pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.articoli.title}</h1>
          </div>
        )}

        <StringToHTML htmlString={testi.articoli.text_html ?? ''} />

        <Suspense fallback={<div>Loading Cards...</div>}>
          <ArticoliCardWrapper docs={articoli} previous="articoli" />
        </Suspense>
      </div>
    </main>
  )
}

export default ArticoliPage
