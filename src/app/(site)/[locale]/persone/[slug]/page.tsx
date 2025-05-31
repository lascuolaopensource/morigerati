//Boilerplate
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/utils/db'
import type { Media } from '@/payload-types'

import Copertina from '@/components/uiElements/copertina'
import Galleria from '@/components/galleria/galleria'

//Locale
import { getMessages, getLocale } from 'next-intl/server'
//Metadata
import { createMetadata } from '@/utils/metadataHelpers'
import { DetailPageHeading } from '@/components/pageLayout/detailPageHeading'
import { Container } from '@/components/uiElements/container'
import { RichText } from '@payloadcms/richtext-lexical/react'
import PixelBorder from '@/components/uiElements/pixelBorder'
import { InfoSection } from '@/components/uiElements/infoSection'
import { Contatti } from '@/components/uiElements/contatti'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const persone = await db.find({ collection: 'persone', depth: 2, locale: locale })

  const stakeholderData = persone.docs.find((s) => s.slug === slug)

  if (!stakeholderData) {
    notFound()
    return {
      title: locale === 'it' ? 'Persona non trovata | Morigerati' : 'Person not found | Morigerati',
    }
  }

  return createMetadata(stakeholderData, {
    pagePath: `persone/${slug}`,
    titleField: 'nome',
    defaultTitle: locale === 'it' ? 'Persona' : 'Person',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function persone({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()

  // Get translation messages
  const messages = await getMessages()

  // Get persone
  const persone = await db.find({ collection: 'persone', depth: 2, locale })

  const persona = persone.docs.find((s) => s.slug === slug)
  if (!persona) notFound()

  // Get all itinerari
  const allItinerari = await db.find({ collection: 'itinerari' })

  // Filter itinerari that have this persone
  const itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
    itinerario.persone?.some((s) =>
      typeof s === 'string' ? s === persona.id : s.id === persona.id,
    ),
  )

  const galleryItems = persona.galleria as Media[]

  return (
    <>
      <Copertina copertina={persona.copertina as Media} />

      <DetailPageHeading
        collection="persone"
        backButton={{ message: messages.backButton.persone, href: '/persone' }}
        title={persona.nome}
        position={persona.posizione}
      >
        {persona.tipologia && <Tag tag={persona.tipologia} />}
      </DetailPageHeading>

      <Container className="max-w-prose space-y-8">
        <RichText data={persona.testo} className="prose md:prose-lg" />

        {persona.contatti && (
          <InfoSection collection="persone" title={messages.luoghi.contacts}>
            <Contatti contatti={persona.contatti} />
          </InfoSection>
        )}
      </Container>

      {/* TODO - Itinerari correlati */}
      {/* <RelatedItineraries
          itinerari={itinerariCorrelati}
          messageTitle={messages.strings.itinerariesFoundIn}
        /> */}

      <PixelBorder className="bg-personeColor" />

      {galleryItems.length > 0 && (
        <div className={`bg-personeColor`}>
          <Container>
            <Galleria items={galleryItems} />
          </Container>
        </div>
      )}
    </>
  )
}

function Tag(props: { tag: string }) {
  const { tag } = props

  return (
    <p className="text-sm rounded-full bg-personeColorScuro px-2 py-1 text-white w-fit">{tag}</p>
  )
}
