import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'
import { isArrayEmpty } from '@/utils/isArrayEmpty'
import ProgrammaList from '@/components/residenze/programmaList'
import DateDaDefinireBanner from '@/components/residenze/annuncio'
import TutorCard from '@/components/residenze/espertiCard'
import { Residenze } from '@/payload-types'
import InfoResidenza from '@/components/residenze/infoResidenza'
import PulsanteIscrizione from '@/components/residenze/pulsanteIscrizione'
import Copertina from '@/components/uiElements/copertina'
import { Media } from '@/payload-types'
import { RandomPixel } from '@/components/uiElements/pixels'
import Galleria from '@/components/galleria/galleria'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Locale } from '@/utils/localization'
import { getMessages } from '@/utils/getMessages'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>
}) {
  const { slug, locale } = await params
  const db = await loadDb()
  const residenze = await db.find({ collection: 'residenze', depth: 2, locale: 'all' })

  // Find the residenza with the matching slug
  // Handle both localized and non-localized slugs
  const residenzaData = residenze.docs.find((r) => {
    if (typeof r.slug === 'object' && r.slug !== null) {
      // Handle localized slugs
      return r.slug[locale] === slug || Object.values(r.slug).includes(slug)
    }
    // Handle non-localized slugs
    return r.slug === slug
  })

  if (!residenzaData) {
    notFound()
    return { title: 'Residenza non trovata | Morigerati' }
  }

  const metaImage = residenzaData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: `${residenzaData.nome} | Morigerati`,
    description: residenzaData?.meta?.description,
    openGraph: {
      title: residenzaData?.meta?.title ?? residenzaData.nome ?? 'Morigerati',
      description: residenzaData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/residenze/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: residenzaData?.meta?.title ?? residenzaData.nome ?? 'Morigerati',
      description: residenzaData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export default async function ResidenzaSlug({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>
}) {
  const { slug, locale } = await params
  const db = await loadDb()
  const residenze = await db.find({ collection: 'residenze', depth: 2, locale: 'all' })

  // Get translation messages
  const messages = await getMessages(locale, ['common'])

  // Translation function
  const t = (key: string, defaultValue: string = '') => {
    const keyParts = key.split(':')
    let namespace = 'common'
    let messageKey = key

    if (keyParts.length > 1) {
      namespace = keyParts[0]
      messageKey = keyParts[1]
    }

    const namespaceObj = messages[namespace]
    if (!namespaceObj) return defaultValue

    let result = namespaceObj
    for (const part of messageKey.split('.')) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part]
      } else {
        return defaultValue
      }
    }

    return result || defaultValue
  }

  // Find the residenza with the matching slug
  // Handle both localized and non-localized slugs
  const residenzaData = residenze.docs.find((r) => {
    if (typeof r.slug === 'object' && r.slug !== null) {
      // Handle localized slugs
      return r.slug[locale] === slug || Object.values(r.slug).includes(slug)
    }
    // Handle non-localized slugs
    return r.slug === slug
  })

  if (!residenzaData) {
    notFound()
  }

  const isAfterCurrentDate = (dateString: string): boolean => {
    const currentDate = new Date()
    const startDate = new Date(dateString)
    return currentDate > startDate
  }

  // Pre-translate needed strings
  const translations = {
    description: t('common:residenze.description', 'Descrizione'),
    program: t('common:residenze.program', 'Programma'),
    experts: t('common:residenze.experts', 'Esperti'),
    address: t('common:residenze.address', 'Indirizzo'),
    notAvailable: t('common:strings.notAvailable', 'Non disponibile'),
    startDate: t('common:residenze.startDate', 'Data inizio'),
    endDate: t('common:residenze.endDate', 'Data fine'),
    registrationDeadline: t('common:residenze.registrationDeadline', 'Deadline iscrizioni'),
    dateToBeDefined: t('common:residenze.dateToBeDefined', 'Data da definire'),
    noDetails: t('common:residenze.noDetails', 'Nessun dettaglio disponibile.'),
    datesNotAnnounced: t(
      'common:residenze.datesNotAnnounced',
      'Le date non sono state ancora annunciate, torna presto!',
    ),
    projects: t('common:residenze.projects', 'Progetti'),
    organizations: t('common:residenze.organizations', 'Organizzazioni'),
    expand: t('common:residenze.expand', 'Espandi'),
    collapse: t('common:residenze.collapse', 'Comprimi'),
    register: t('common:residenze.register', 'Iscriviti'),
  }

  return (
    <div>
      <Copertina copertina={residenzaData.copertina as Media | undefined} />

      <div className="p-4 sm:px-6 lg:px-12 xl:px-16 max-w-[1400px] mx-auto">
        <BackButton />
        <div className="pt-8" />

        <div className="w-full max-w-[1200px] mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 w-full overflow-hidden">
              <div className="prose-custom-no-center">
                {residenzaData.nome && (
                  <h1 className="text-4xl font-bold !text-residenzeColor mb-4 break-words">
                    {typeof residenzaData.nome === 'object' && residenzaData.nome !== null
                      ? residenzaData.nome[locale] || ''
                      : residenzaData.nome}
                  </h1>
                )}

                {!isAfterCurrentDate(residenzaData?.data_inizio ?? '') &&
                  residenzaData.abstract && (
                    <RichText
                      data={
                        typeof residenzaData.abstract === 'object' &&
                        residenzaData.abstract !== null
                          ? ((residenzaData.abstract[locale] || {}) as SerializedEditorState)
                          : (residenzaData.abstract as SerializedEditorState)
                      }
                      className="prose prose-lg"
                    />
                  )}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              {residenzaData.mostra_dettagli ? (
                <InfoResidenza
                  residenza={residenzaData}
                  locale={locale}
                  onlyDate={isAfterCurrentDate(residenzaData?.data_inizio ?? '')}
                  translations={{
                    address: translations.address,
                    notAvailable: translations.notAvailable,
                    startDate: translations.startDate,
                    endDate: translations.endDate,
                    registrationDeadline: translations.registrationDeadline,
                    dateToBeDefined: translations.dateToBeDefined,
                  }}
                />
              ) : residenzaData.data_inizio && residenzaData.data_fine ? (
                <DateDaDefinireBanner datesNotAnnouncedText={translations.datesNotAnnounced} />
              ) : null}
            </div>
          </div>

          {isAfterCurrentDate(residenzaData?.data_inizio ?? '') && residenzaData.abstract && (
            <div className="mt-12 max-w-[800px] mx-auto">
              <RichText
                data={
                  typeof residenzaData.abstract === 'object' && residenzaData.abstract !== null
                    ? ((residenzaData.abstract[locale] || {}) as SerializedEditorState)
                    : (residenzaData.abstract as SerializedEditorState)
                }
                className="prose prose-lg"
              />
            </div>
          )}

          <div className="mt-12 max-w-[800px] mx-auto">
            <PulsanteIscrizione
              link={residenzaData.link_iscrizione ?? ''}
              show={residenzaData.mostra_pulsante_iscrizione ?? false}
              buttonText={translations.register}
              isArchived={isAfterCurrentDate(residenzaData?.data_inizio ?? '')}
            />
          </div>

          {residenzaData.descrizione && (
            <div className="max-w-[800px] mx-auto mt-16">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">
                {translations.description}
              </h2>
              <RichText
                data={
                  typeof residenzaData.descrizione === 'object' &&
                  residenzaData.descrizione !== null
                    ? ((residenzaData.descrizione[locale] || {}) as SerializedEditorState)
                    : (residenzaData.descrizione as SerializedEditorState)
                }
                className="prose prose-lg"
              />
            </div>
          )}

          {!isArrayEmpty(residenzaData.programma) && (
            <div className="max-w-[800px] mx-auto mt-16">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">
                {translations.program}
              </h2>
              <ProgrammaList
                residenza={residenzaData}
                locale={locale}
                noDetailsText={translations.noDetails}
              />
            </div>
          )}

          {!isArrayEmpty(residenzaData.esperti) && (
            <div className="mt-16 w-full mx-auto">
              <h2 className="text-center text-residenzeColor text-2xl font-bold mb-6">
                {translations.experts}
              </h2>
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {(() => {
                  // Handle both localized and non-localized esperti data
                  let expertsArray: any[] = []

                  if (typeof residenzaData.esperti === 'object' && residenzaData.esperti !== null) {
                    // If it's a localized object with locale keys
                    if ('it' in residenzaData.esperti || 'en' in residenzaData.esperti) {
                      expertsArray = (residenzaData.esperti as Record<string, any[]>)[locale] || []
                    }
                  } else if (Array.isArray(residenzaData.esperti)) {
                    // If it's already an array (non-localized)
                    expertsArray = residenzaData.esperti
                  }

                  return expertsArray.map((esperto, index) => (
                    <TutorCard
                      key={index}
                      esperto={esperto}
                      locale={locale}
                      translations={{
                        projects: translations.projects,
                        organizations: translations.organizations,
                        expand: translations.expand,
                        collapse: translations.collapse,
                      }}
                    />
                  ))
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto">
        {residenzaData.galleria && (
          <Galleria items={residenzaData.galleria as Media[]} titleColor=" text-residenzeColor" />
        )}
      </div>
    </div>
  )
}
