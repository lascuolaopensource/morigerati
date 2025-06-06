import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { loadDb } from '@/utils/db'
import type { Luoghi, Media } from '@/payload-types'
import Copertina from '@/components/uiElements/copertina'
import Galleria from '@/components/galleria/galleria'
import { getMessages } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import PixelBorder from '@/components/uiElements/pixelBorder'
import { Container } from '@/components/uiElements/container'
import { useMessages } from 'next-intl'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { DetailPageHeading } from '@/components/pageLayout/detailPageHeading'
import { Contatti } from '@/components/uiElements/contatti'
import { InfoSection } from '@/components/uiElements/infoSection'
import { ServiziSection } from '@/components/uiElements/serviziSection'
import { getLocale } from '@/modules/i18n'
import { createMetadata } from '@/modules/seo'

//

export const dynamic = 'force-dynamic'
export const revalidate = 0

//

interface PageProps {
  params: Promise<{ slug: string }>
}

async function load(pageProps: PageProps) {
  const slug = (await pageProps.params).slug
  const locale = await getLocale()
  const db = await loadDb()
  const { docs } = await db.find({
    collection: 'luoghi',
    depth: 2,
    locale,
    where: { slug: { equals: slug } },
  })
  return { luogo: docs.at(0), locale, db, slug }
}

export default async function LuogoPage(pageProps: PageProps) {
  const { luogo } = await load(pageProps)
  if (!luogo) notFound()
  const messages = await getMessages()

  const galleryItems = (luogo.galleria as Media[]) || []

  return (
    <>
      <Copertina copertina={luogo?.copertina as Media} />

      <DetailPageHeading
        collection="luoghi"
        backButton={{ message: messages.backButton.luoghi, href: `/luoghi` }}
        title={luogo.nome}
        mapProps={{
          initialPosition: luogo.posizione,
        }}
      />

      <Container className="max-w-prose space-y-8">
        <RichText data={luogo.testo} className="prose md:prose-lg" />
        <PixelBorder className="bg-luoghiColor !h-10" />
        <ServiziSection servizi={luogo.servizi} collection="luoghi" />
        <LuogoInfoSection luogo={luogo} />
      </Container>

      {/* TODO: Add related itineraries */}
      {/* <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">

        <RelatedItineraries
          itinerari={itinerariCorrelati}
          messageTitle={messages.strings.itinerariesFoundIn}
        />
      </div> */}

      <PixelBorder className={`w-full bg-luoghiColor`} />

      {galleryItems.length > 0 && (
        <div className={`bg-luoghiColor`}>
          <Container>
            <Galleria items={galleryItems} />
          </Container>
        </div>
      )}
    </>
  )
}

export async function generateMetadata(pageProps: PageProps): Promise<Metadata> {
  const { luogo, locale, slug } = await load(pageProps)

  return createMetadata({
    doc: luogo,
    pathname: `luoghi/${slug}`,
    locale,
  })
}

/* Utils */

function LuogoInfoSection(props: { luogo: Luoghi }) {
  const { luogo } = props
  const messages = useMessages()

  const contatti = luogo.contatti ?? []
  const hasContatti = contatti.length > 0

  const orari = luogo.orari
  const hasOrari = orari?.root && !isRichTextEmpty(orari)

  if (!hasContatti && !hasOrari) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {hasContatti && (
        <InfoSection collection="luoghi" title={messages.luoghi.contacts}>
          <Contatti contatti={contatti} />
        </InfoSection>
      )}

      {hasOrari && (
        <InfoSection collection="luoghi" title={messages.luoghi.openingHours} text={orari} />
      )}
    </div>
  )
}

// TODO - Review
// function getRelatedItineraries(luogo: Luoghi) {

//   // Get all itinerari
//   const allItinerari = await db.find({
//     collection: 'itinerari',
//     depth: 2,
//     locale: locale,
//   })

//   let itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
//     itinerario.luoghi?.some((l) =>
//       typeof l === 'string' ? l === luogoData.id : l.id === luogoData.id,
//     ),
//   )

//   // If Itinerari_relation exists, add those itinerari too (if not already included)
//   if (luogoData.Itinerari_relation && Array.isArray(luogoData.Itinerari_relation)) {
//     const itinerariFromRelation = luogoData.Itinerari_relation.map((rel) =>
//       typeof rel === 'string' ? rel : rel.id,
//     )

//     // Get any itineraries from the relation that aren't already in itinerariCorrelati
//     const additionalItinerari = allItinerari.docs.filter(
//       (itinerario) =>
//         itinerariFromRelation.includes(itinerario.id) &&
//         !itinerariCorrelati.some((i) => i.id === itinerario.id),
//     )

//     // Combine the arrays if there are additional itineraries
//     if (additionalItinerari.length > 0) {
//       itinerariCorrelati = [...itinerariCorrelati, ...additionalItinerari]
//     }
//   }
// }
