//Boilerplate
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Media } from '@/payload-types'
//Components
import BackButton from '@/components/uiElements/backButton'
import ProgrammaList from './_partials/programmaList'
import DateDaDefinireBanner from './_partials/annuncio'
import TutorCard from './_partials/espertiCard'
import InfoResidenza from './_partials/infoResidenza'
import PulsanteIscrizione from './_partials/pulsanteIscrizione'
import Copertina from '@/components/uiElements/copertina'
import Galleria from '@/components/galleria/galleria'
//Utils
import { isArrayEmpty } from '@/utils/isArrayEmpty'
//Locale
import { getMessages } from 'next-intl/server'
//Metadata
import { createMetadata } from '@/utils/metadataHelpers'
import { getLocale } from '@/utils/i18n'

//

export const dynamic = 'force-dynamic'
export const revalidate = 0

//

async function loadResidenza(slug: string) {
  const db = await loadDb()
  const locale = await getLocale()
  const { docs } = await db.find({
    collection: 'residenze',
    depth: 2,
    locale: locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  if (docs.length != 1) return undefined
  return docs[0]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const locale = await getLocale()
  const slug = (await params).slug
  const residenzaData = await loadResidenza(slug)

  if (!residenzaData) {
    notFound()
    return {
      title:
        locale === 'it' ? 'Residenza non trovata | Morigerati' : 'Residency not found | Morigerati',
    }
  }

  return createMetadata(residenzaData, {
    pagePath: `residenze/${slug}`,
    titleField: 'nome',
    defaultTitle: locale === 'it' ? 'Residenza Artistica' : 'Artist Residency',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export default async function ResidenzaSlug({ params }: { params: Promise<{ slug: string }> }) {
  const residenza = await loadResidenza((await params).slug)
  if (!residenza) notFound()

  const messages = await getMessages()

  const startDate = new Date(residenza.data_inizio)
  const isPastDate = startDate < new Date()

  return (
    <div>
      <Copertina copertina={residenza.copertina as Media} />

      <div className="p-4 sm:px-6 lg:px-12 xl:px-16 max-w-[1400px] mx-auto">
        <BackButton message={messages.backButton.residenze} redirect={'/residenze'} />
        <div className="pt-8" />

        <div className="w-full max-w-[1200px] mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row gap-8 p-6">
            <div className="lg:w-1/2 w-full overflow-hidden">
              <div className="prose-custom-no-center">
                {residenza.nome && (
                  <h1 className="text-4xl font-bold !text-residenzeColor mb-4 break-words">
                    {residenza.nome}
                  </h1>
                )}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              {residenza.mostra_dettagli ? (
                <InfoResidenza residenza={residenza} onlyDate={isPastDate} />
              ) : residenza.data_inizio && residenza.data_fine ? (
                <DateDaDefinireBanner
                  datesNotAnnouncedText={messages.residenze.datesNotAnnounced}
                />
              ) : null}
            </div>
          </div>

          <div className="mt-12 max-w-[800px] mx-auto">
            <RichText
              data={residenza.abstract as unknown as SerializedEditorState}
              className="prose prose-lg"
            />
          </div>

          <div className="mt-12 max-w-[800px] mx-auto">
            <PulsanteIscrizione
              link={residenza.link_iscrizione ?? ''}
              show={residenza.mostra_pulsante_iscrizione ?? false}
              buttonText={messages.residenze.register}
              isArchived={isPastDate}
            />
          </div>

          {residenza.descrizione && (
            <div className="max-w-[800px] mx-auto mt-16 bg-white p-8">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6 pb-2">
                {messages.residenze.description}
              </h2>
              <RichText
                data={residenza.descrizione as SerializedEditorState}
                className="prose prose-lg"
              />
            </div>
          )}

          {!isArrayEmpty(residenza.programma) && (
            <div className="max-w-[800px] mx-auto mt-16 bg-white px-8">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6 pb-2 ">
                {messages.residenze.program}
              </h2>
              <ProgrammaList residenza={residenza} noDetailsText={messages.residenze.noDetails} />
            </div>
          )}

          {!isArrayEmpty(residenza.esperti) && (
            <div className="mt-16 w-full mx-auto">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">
                {messages.residenze.experts}
              </h2>
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {residenza.esperti?.map((esperto, index) => (
                  <TutorCard
                    key={index}
                    esperto={esperto}
                    translations={{
                      projects: messages.residenze.projects,
                      organizations: messages.residenze.organizations,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto">
        {residenza.galleria && <Galleria items={residenza.galleria as Media[]} />}
      </div>
    </div>
  )
}
