//Boilerplate
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/modules/utils/db'
import type { Media } from '@/payload-types'

import Copertina from '@/modules/components/uiElements/copertina'
import Galleria from '@/modules/components/galleria/galleria'

//Locale
import { getMessages } from 'next-intl/server'
import { DetailPageHeading } from '@/modules/components/pageLayout/detailPageHeading'
import { Container } from '@/modules/components/uiElements/container'
import { RichText } from '@payloadcms/richtext-lexical/react'
import PixelBorder from '@/modules/components/uiElements/pixelBorder'
import { InfoSection } from '@/modules/components/uiElements/infoSection'
import { Contatti } from '@/modules/components/uiElements/contatti'
import { getLocale } from '@/modules/i18n'
import { createMetadata } from '@/modules/seo'

//

export const dynamic = 'force-dynamic'
export const revalidate = 0

//

type PageProps = {
  params: Promise<{ slug: string }>
}

async function load(pageProps: PageProps) {
  const slug = (await pageProps.params).slug
  const db = await loadDb()
  const locale = await getLocale()
  const { docs } = await db.find({
    collection: 'persone',
    depth: 2,
    locale,
    where: { slug: { equals: slug } },
  })
  return { persona: docs.at(0), locale, db, slug }
}

export default async function persone(pageProps: PageProps) {
  const { persona } = await load(pageProps)
  if (!persona) notFound()

  const messages = await getMessages()

  const galleryItems = persona.galleria as Media[]

  // TODO - Review itinerari collegati
  // // Get all itinerari
  // const allItinerari = await db.find({ collection: 'itinerari' })
  // // Filter itinerari that have this persone
  // const itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
  //   itinerario.persone?.some((s) =>
  //     typeof s === 'string' ? s === persona.id : s.id === persona.id,
  //   ),
  // )

  return (
    <>
      <Copertina copertina={persona.copertina as Media} />

      <DetailPageHeading
        collection="persone"
        backButton={{ message: messages.backButton.persone, href: '/persone' }}
        title={persona.nome}
        mapProps={{
          initialPosition: persona.posizione,
        }}
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

export async function generateMetadata(pageProps: PageProps): Promise<Metadata> {
  const { persona, locale, slug } = await load(pageProps)

  return createMetadata({
    doc: persona,
    pathname: `persone/${slug}`,
    locale,
  })
}

/* Utils */

function Tag(props: { tag: string }) {
  const { tag } = props

  return (
    <p className="text-sm rounded-full bg-personeColorScuro px-2 py-1 text-white w-fit">{tag}</p>
  )
}
