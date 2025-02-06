import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Articoli, Media } from '@/payload-types'
import ArchiveCard from '@/components/articoli/articoliArchiveCard'
import articoliUnpacker from '@/components/articoli/articoloPropsUnpack'
import BackButton from '@/components/uiElements/backButton'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import NonCiSonoArticoli from '@/components/articoli/nonCiSonoArticoli'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const TuttiArticoliPage = async () => {
  const payload = await getPayload({ config })

  const testi = await payload.findGlobal({
    slug: 'testi',
  })

  const articoliData = await payload.find({
    collection: 'articoli',
  })

  const articoli: Articoli[] = articoliData.docs

  return (
    <main className="sm:px-8 md:px-12 lg:px-24">
      <div className="bg-white p-3 pt-5 max-w-screen-xl mx-auto">
        {testi.articoli.title && (
          <div className="font-normal text-sm pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.articoli.title}</h1>
          </div>
        )}

        <RichText data={testi.articoli.testo as SerializedEditorState} className="prose prose-lg" />

        <div className="flex flex-wrap -mx-2">
          {articoli.length > 0 ? (
            articoli.map((articolo, index) => {
              const { title, subtitle, media, slugUrl, tags } = articoliUnpacker(articolo)
              return (
                <div key={index} className="w-full md:w-1/2 p-2">
                  <ArchiveCard
                    title={title}
                    subtitle={subtitle}
                    media={media as Media | undefined}
                    slugUrl={`/articoli/${slugUrl}`}
                    tags={tags}
                  />
                </div>
              )
            })
          ) : (
            <NonCiSonoArticoli />
          )}
        </div>
      </div>
    </main>
  )
}

export default TuttiArticoliPage
