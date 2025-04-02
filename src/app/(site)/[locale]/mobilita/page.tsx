import React from 'react'
import { Metadata } from 'next'
import { type MobilitaSostenibile } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fetchGlobalData } from '@/utils/dataFetching'
import { createMetadata } from '@/utils/metadataHelpers'
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
import { Locale } from '@/utils/localization'
import { getMessages } from '@/utils/getMessages'
import { RandomLetter } from '@/components/home/randomLetter'
import { Globals } from '@/db/globals'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MobilitaProps {
  params: Promise<{ locale: Locale }>
}

/**
 * Fetch the Mobilita Sostenibile data
 */
async function fetchMobilitaData(locale: Locale): Promise<MobilitaSostenibile> {
  return await fetchGlobalData<MobilitaSostenibile>(Globals.MobilitaSostenibile, locale)
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: MobilitaProps): Promise<Metadata> {
  const { locale } = await params
  const mobilita = await fetchMobilitaData(locale)
  return createMetadata(mobilita, {
    defaultTitle: locale === 'it' ? 'Mobilità Sostenibile' : 'Sustainable Mobility',
    pagePath: 'mobilita',
  })
}

/**
 * Mobilità Sostenibile page component
 */
const Mobilita = async ({ params }: MobilitaProps) => {
  const { locale } = await params
  const mobilita = await fetchMobilitaData(locale)
  const messages = await getMessages(locale, ['common', 'mobility'])

  const t = (key: string, defaultValue: string = '') => {
    const [namespace, messageKey] = key.split(':')
    return messages[namespace]?.[messageKey] || defaultValue
  }

  return (
    <ContentPageLayout
      coverImage={mobilita.copertina}
      richTextContent={mobilita.testo as SerializedEditorState}
      galleryItems={mobilita.galleria}
    >
      <main className="max-w-screen-xl mx-auto relative py-8">
        <RandomLetter color="articoli" position={'right'} />
      </main>
    </ContentPageLayout>
  )
}

export default Mobilita
