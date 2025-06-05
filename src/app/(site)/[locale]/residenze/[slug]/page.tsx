import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { loadDb } from '@/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import ProgrammaList from './_partials/programmaList'
import TutorCard from './_partials/espertiCard'
import InfoResidenza from './_partials/infoResidenza'
import Copertina from '@/components/uiElements/copertina'
import Galleria from '@/components/galleria/galleria'
import { getMessages } from 'next-intl/server'
import { createMetadata } from '@/utils/metadataHelpers'
import { getLocale } from '@/utils/i18n'
import { DetailPageHeading } from '@/components/pageLayout/detailPageHeading'
import { format } from 'date-fns'
import { Container } from '@/components/uiElements/container'
import { SectionTitle } from '@/components/uiElements/sectionTitle'
import PixelBorder from '@/components/uiElements/pixelBorder'
import { getResidenzaState } from './_partials/utils'

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

  const { data_inizio, deadline_iscrizione, link_iscrizione, mostra_pulsante_iscrizione } =
    residenza

  const messages = await getMessages()
  const state = getResidenzaState(residenza)

  const startDateString = format(residenza.data_inizio, 'dd/MM/yyyy')
  const endDateString = residenza.data_fine ? format(residenza.data_fine, 'dd/MM/yyyy') : undefined

  return (
    <div>
      <Copertina copertina={residenza.copertina as Media} />
      <DetailPageHeading
        title={residenza.nome}
        collection="residenze"
        backButton={{
          message: messages.backButton.residenze,
          href: '/residenze',
        }}
        rightContent={
          state != 'started' && (
            <div className="grow w-full space-y-6">
              <InfoResidenza residenza={residenza} />
            </div>
          )
        }
      >
        {state == 'started' && (
          <div className="flex gap-2">
            <span>{startDateString}</span>
            {endDateString && (
              <>
                <span>→</span>
                <span>{endDateString}</span>
              </>
            )}
          </div>
        )}
      </DetailPageHeading>

      {residenza.abstract && (
        <Container className="flex flex-col items-center max-w-prose">
          <RichText
            data={residenza.abstract}
            className="prose prose-lg text-center text-balance"
            disableTextAlign={true}
          />
        </Container>
      )}

      <Container className="flex flex-col items-center max-w-prose space-y-8">
        {residenza.descrizione && (
          <div className="space-y-4">
            <SectionTitle color="residenze">{messages.residenze.description}</SectionTitle>
            <RichText
              data={residenza.descrizione}
              className="prose prose-lg text-left"
              disableTextAlign={true}
            />
          </div>
        )}

        {residenza.programma?.length && (
          <div className="">
            <SectionTitle color="residenze" className="border-none">
              {messages.residenze.program}
            </SectionTitle>
            <ProgrammaList residenza={residenza} noDetailsText={messages.residenze.noDetails} />
          </div>
        )}

        {residenza.esperti?.length && (
          <div className="space-y-4">
            <SectionTitle color="residenze">{messages.residenze.experts}</SectionTitle>
            <div className="space-y-2">
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
      </Container>

      <PixelBorder className="bg-residenzeColor" />
      <div className="bg-residenzeColor">
        <Container>
          {residenza.galleria && <Galleria items={residenza.galleria as Media[]} />}
        </Container>
      </div>
    </div>
  )
}
