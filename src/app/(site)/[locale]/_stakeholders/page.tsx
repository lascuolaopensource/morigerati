import React from 'react'
import CardsPage from '@/components/card/cardsPage'
import { Locale } from '@/utils/localization'
import { Metadata } from 'next'
import { loadDb } from '@/utils/db'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale })

  // Get the appropriate title from payload (text used for the page)
  const title = locale === 'it' ? 'Tutte le persone | Morigerati' : 'All people | Morigerati'
  const description = (testi?.stakeholders as any)?.meta?.description || undefined

  const metaImage = (testi?.stakeholders as any)?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/stakeholders`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  return <CardsPage collectionQuery="stakeholders" locale={locale} />
}
