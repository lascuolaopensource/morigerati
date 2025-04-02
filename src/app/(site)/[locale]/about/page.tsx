import React from 'react'
import { Metadata } from 'next'
import { type ChiSiamo as ChiSiamoType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fetchGlobalData } from '@/utils/dataFetching'
import { createMetadata } from '@/utils/metadataHelpers'
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
import { RandomLetter } from '@/components/home/randomLetter'
import { Locale } from '@/utils/localization'
import { getMessages } from '@/utils/getMessages'
import { Globals } from '@/db/globals'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ChiSiamoProps {
  params: Promise<{ locale: Locale }>
}

/**
 * Fetch the Chi Siamo data
 */
async function fetchChiSiamoData(locale: Locale): Promise<ChiSiamoType> {
  return await fetchGlobalData<ChiSiamoType>(Globals.ChiSiamo, locale)
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: ChiSiamoProps): Promise<Metadata> {
  const { locale } = await params
  const chiSiamo = await fetchChiSiamoData(locale)
  return createMetadata(chiSiamo, {
    defaultTitle: locale === 'it' ? 'Chi Siamo' : 'About Us',
    pagePath: 'about',
  })
}

/**
 * Chi Siamo (About) page component
 */
export default async function ChiSiamo({ params }: ChiSiamoProps) {
  const { locale } = await params
  const chiSiamo = await fetchChiSiamoData(locale)
  const messages = await getMessages(locale, ['common', 'about'])

  const t = (key: string, defaultValue: string = '') => {
    const [namespace, messageKey] = key.split(':')
    return messages[namespace]?.[messageKey] || defaultValue
  }

  return (
    <ContentPageLayout
      coverImage={chiSiamo.copertina}
      richTextContent={chiSiamo.testo_chi_siamo as SerializedEditorState}
      galleryItems={chiSiamo.galleria}
    >
      {' '}
      <main className="max-w-screen-xl mx-auto relative py-8">
        <RandomLetter color="articoli" position={'right'} />
      </main>
    </ContentPageLayout>
  )
}
