import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import StringToHTML from '@/components/serializer/stringToHTML'
import { Articoli, Media } from '@/payload-types'
import ArchiveCard from '@/components/articoli/articoliArchiveCard'
import articoliUnpacker from '@/components/articoli/articoloPropsUnpack'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const TuttiArticoliPage = async () => {
  const payload = await getPayloadHMR({ config })

  const testi = await payload.findGlobal({
    slug: 'testi',
  })

  const articoliData = await payload.find({
    collection: 'articoli',
  })

  const articoli: Articoli[] = articoliData.docs

  return (
    <main className="">
      <div className="bg-white p-3 pt-5">
        {testi.articoli.title && (
          <div className="font-normal text-sm pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.articoli.title}</h1>
          </div>
        )}

        <StringToHTML htmlString={testi.articoli.text_html ?? ''} />

        <div className="">
          {articoli.map((articolo, index) => {
            const { title, subtitle, media, slugUrl, tags } = articoliUnpacker(articolo)
            return (
              <div key={index} className="pb-4">
                <ArchiveCard
                  title={title}
                  subtitle={subtitle}
                  media={media as Media | undefined}
                  slugUrl={slugUrl}
                  tags={tags}
                />
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default TuttiArticoliPage
