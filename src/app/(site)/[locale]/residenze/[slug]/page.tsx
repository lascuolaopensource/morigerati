import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { loadDb } from '@/modules/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import ProgrammaList from './_partials/programmaList'
import TutorCard from './_partials/espertiCard'
import InfoResidenza from './_partials/infoResidenza'
import Copertina from '@/modules/components/uiElements/copertina'
import Galleria from '@/modules/components/galleria/galleria'
import { getMessages } from 'next-intl/server'
import { getLocale } from '@/modules/i18n'
import { DetailPageHeading } from '@/modules/components/pageLayout/detailPageHeading'
import { format } from 'date-fns'
import { Container } from '@/modules/components/uiElements/container'
import { SectionTitle } from '@/modules/components/uiElements/sectionTitle'
import PixelBorder from '@/modules/components/uiElements/pixelBorder'
import { getResidenzaState } from './_partials/utils'
import { createMetadata } from '@/modules/seo'

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
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return { residenza: docs.at(0), locale, db }
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ResidenzaSlug({ params }: { params: Promise<{ slug: string }> }) {
  const { residenza } = await loadResidenza((await params).slug)
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug
  const { residenza, locale } = await loadResidenza(slug)

  return createMetadata({
    doc: residenza,
    pathname: `residenze/${slug}`,
    locale,
  })
}
