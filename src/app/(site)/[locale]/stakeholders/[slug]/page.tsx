import React from 'react'
import { loadDb } from '@/utils/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import BackButton from '@/components/uiElements/backButton'
import { Stakeholder as StakeholderType } from '@/payload-types'

import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import Copertina from '@/components/uiElements/copertina'

import { Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'
import TagsList from '@/components/articoli/tagsList'
import CardGrid from '@/components/card/cardsGrid'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getMessages } from '@/utils/getMessages'
import { Locale } from '@/utils/localization'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>
}) {
  const { slug, locale } = await params
  const db = await loadDb()
  const stakeholders = await db.find({ collection: 'stakeholders', depth: 2, locale: 'all' })

  const stakeholderData = stakeholders.docs.find((s) => s.slug === slug)

  if (!stakeholderData) {
    notFound()
    return { title: 'Stakeholder non trovato | Morigerati' }
  }

  const metaImage = stakeholderData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: `${stakeholderData.nome} | Morigerati`,
    description: stakeholderData?.meta?.description,
    openGraph: {
      title: stakeholderData?.meta?.title ?? stakeholderData.nome ?? 'Morigerati',
      description: stakeholderData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/stakeholders/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: stakeholderData?.meta?.title ?? stakeholderData.nome ?? 'Morigerati',
      description: stakeholderData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Stakeholder({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>
}) {
  const { slug, locale } = await params
  const db = await loadDb()

  // Get translation messages
  const messages = await getMessages(locale)

  // Translation function (server-side)
  const t = (key: string, defaultValue: string = '') => {
    const keyParts = key.split('.')
    let namespace = 'common'
    let messageKey = key

    if (key.includes(':')) {
      const [ns, rest] = key.split(':')
      namespace = ns
      messageKey = rest
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

  // Get stakeholder
  const stakeholders = await db.find({ collection: 'stakeholders', depth: 2, locale: 'all' })

  const stakeholderData = stakeholders.docs.find((s) => s.slug === slug)

  if (!stakeholderData) {
    notFound()
  }

  // Get all itinerari
  const allItinerari = await db.find({ collection: 'itinerari', depth: 2 })

  // Filter itinerari that have this stakeholder
  const itinerariCorrelati = allItinerari.docs.filter((itinerario) =>
    itinerario.stakeholders?.some((s) =>
      typeof s === 'string' ? s === stakeholderData.id : s.id === stakeholderData.id,
    ),
  )

  const position: LatLngTuple = stakeholderData.posizione ?? [40.139949, 15.555182]

  return (
    <div className="">
      {stakeholderData.copertina && (
        <Copertina copertina={stakeholderData.copertina as Media | undefined} />
      )}

      <div className="p-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <BackButton />
        <div className="pt-4"></div>

        {/* Grid container for desktop layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-8">
          {/* Left column: Content */}
          <div>
            {/* Tags */}
            {stakeholderData.tipologia && (
              <div className="pt-4">
                <span className="font-medium">{t('common:stakeholders.type', 'Tipologia')}: </span>
                <TagsList
                  tags={
                    Array.isArray(stakeholderData.tipologia)
                      ? stakeholderData.tipologia
                      : [
                          typeof stakeholderData.tipologia === 'object' &&
                          stakeholderData.tipologia !== null
                            ? stakeholderData.tipologia[locale]
                            : stakeholderData.tipologia,
                        ]
                  }
                />
              </div>
            )}

            {/* Nome e tipologia */}
            <div className="mb-6">
              {stakeholderData.nome && (
                <h1 className="text-4xl text-stakeholderColorScuro font-bold mb-4">
                  {stakeholderData.nome}
                </h1>
              )}

              {/* Indirizzo - localized field */}
              {stakeholderData.indirizzo && (
                <div className="text-gray-700 mb-4">
                  <span className="font-medium">
                    {t('common:stakeholders.address', 'Indirizzo')}:{' '}
                  </span>
                  {typeof stakeholderData.indirizzo === 'object' &&
                  stakeholderData.indirizzo !== null
                    ? stakeholderData.indirizzo[locale]
                    : stakeholderData.indirizzo}
                </div>
              )}
            </div>

            {/* Testo descrittivo */}
            {(() => {
              let textContent = null

              if (stakeholderData.testo) {
                // Check if testo is a localized object
                if (
                  typeof stakeholderData.testo === 'object' &&
                  stakeholderData.testo !== null &&
                  (stakeholderData.testo.it || stakeholderData.testo.en)
                ) {
                  // Get the content for current locale
                  textContent = stakeholderData.testo[locale]
                } else {
                  // Direct rich text object
                  textContent = stakeholderData.testo
                }
              }

              return textContent && typeof textContent === 'object' && 'root' in textContent ? (
                <div className="mb-6">
                  <RichText
                    data={textContent as SerializedEditorState}
                    className="prose prose-lg"
                  />
                </div>
              ) : null
            })()}

            {/* Contatti */}
            {stakeholderData.contatti && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  {t('common:luoghi.contacts', 'Contatti')}
                </h2>
                <ul className="space-y-4">
                  {(() => {
                    // Get only contacts for the current locale
                    let contacts = []

                    if (
                      typeof stakeholderData.contatti === 'object' &&
                      stakeholderData.contatti !== null
                    ) {
                      // If it's a localized object with locale keys
                      if ('it' in stakeholderData.contatti || 'en' in stakeholderData.contatti) {
                        // Only use contacts for the current locale
                        const localeContacts = (stakeholderData.contatti as Record<string, any[]>)[
                          locale
                        ]
                        if (Array.isArray(localeContacts)) {
                          contacts = localeContacts
                        }
                      } else if (Array.isArray(stakeholderData.contatti)) {
                        // It's already an array (non-localized fallback)
                        contacts = stakeholderData.contatti
                      }
                    }

                    // Only render if we have contacts for this locale
                    return contacts.length > 0
                      ? contacts.map((contatto, index) => (
                          <li key={index} className="pb-4 last:pb-0">
                            <p className="font-medium text-lg mb-2">{contatto.nome}</p>
                            {contatto.telefono && (
                              <p className="text-sm mb-1">
                                <span className="font-medium">
                                  {t('common:stakeholders.phone', 'Telefono')}:
                                </span>{' '}
                                {contatto.telefono}
                              </p>
                            )}
                            {contatto.email && (
                              <p className="text-sm mb-1">
                                <span className="font-medium">
                                  {t('common:stakeholders.email', 'Email')}:
                                </span>{' '}
                                {contatto.email}
                              </p>
                            )}
                            {contatto.link && (
                              <p className="text-sm">
                                <span className="font-medium">
                                  {t('common:stakeholders.link', 'Link')}:
                                </span>{' '}
                                <a
                                  href={contatto.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {contatto.link}
                                </a>
                              </p>
                            )}
                          </li>
                        ))
                      : null
                  })()}
                </ul>
              </div>
            )}
          </div>

          {/* Right column: Map */}
          <div className="lg:order-2">
            <div className="h-[500px] lg:top-4 flex items-center justify-center">
              <DynamicMappa initialPosition={position} initialZoom={14} showPositionPin={true} />
            </div>
          </div>
        </div>

        {/* Galleria */}
        {stakeholderData.galleria && stakeholderData.galleria.length > 0 && (
          <div className="mt-8">
            <Galleria items={stakeholderData.galleria as Media[] | undefined} />
          </div>
        )}

        {/* Itinerari correlati */}
        {itinerariCorrelati && itinerariCorrelati.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl text-center font-semibold mb-6">
              {t('common:strings.itinerariesFoundIn', 'In quale itinerario potrai trovarci')}
            </h2>
            <CardGrid items={itinerariCorrelati} category="itinerari" />
          </div>
        )}
      </div>
    </div>
  )
}
