import React from 'react'
import { loadDb } from '@/utils/db'
import type { Metadata } from 'next'
import HomeCollection from '@/components/home/homeCollection'
import HomeTracksSection from '@/components/home/homeTracksSection'
import { notFound } from 'next/navigation'
import { Locale, isValidLocale } from '@/utils/localization'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Copertina from '@/components/uiElements/copertina'
import { Media, Tracciati as TracciatiType } from '@/payload-types'
import GridOverlay from '@/components/uiElements/gridOverlay'
import { locales } from '@/middleware'

// Generate static paths for each locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// Dictionary for translations

interface HomePageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params

  const db = await loadDb()
  const home = await db.findGlobal({ slug: 'home', locale })

  const metaImage = home?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'

  const title =
    (home?.meta?.title ?? locale === 'it')
      ? 'Morigerati - Transluoghi'
      : 'Morigerati - Transluoghi in English'
  const description = home?.meta?.description || undefined

  return {
    title,
    description,
    openGraph: { title, description, images: imageUrl ? [{ url: imageUrl }] : undefined },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params

  // Validate locale
  if (locale !== 'it' && locale !== 'en') {
    notFound()
  }

  try {
    const db = await loadDb()

    // Fetch articles with the correct locale
    const { docs: articoli } = await db.find({
      collection: 'articoli',
      limit: 3,
      sort: '-data_pubblicazione',
      locale,
    })

    // Get the home page global with the requested locale
    const home = await db.findGlobal({ slug: 'home', locale })

    // Home page component content
    const IntroSection = ({ isMobile = false }) => (
      <div
        className={`${isMobile ? 'sm:hidden' : 'hidden sm:flex flex-col'} md:w-full md:px-40 mb-4`}
      >
        <h2 className={`${isMobile ? 'pt-4 text-xl' : 'text-3xl'} text-center `}>{home.title}</h2>
        <RichText data={home.testo as SerializedEditorState} className="prose-custom" />
      </div>
    )

    return (
      <main className="max-w-screen-xl mx-auto">
        <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw] ">
          {home.cover && <Copertina copertina={home.cover as Media} />}
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-transInstrumentSans text-center font-bold text-white text-3xl z-10 max-w-xl px-4">
              {home.statement}
            </p>
          </div>
          <GridOverlay targetSquareSize={20} bottomDensity={1} effectRows={8} />
        </div>

        <div className="font-normal p-3 pt-4 w-full">
          <IntroSection />
          <IntroSection isMobile />

          <HomeCollection
            collection="itinerari"
            hasMap={true}
            title={home.itinerari.title}
            text={home.itinerari.testo as SerializedEditorState}
            tracciati={home.tracciati_mappa as TracciatiType[]}
            locale={locale}
          />
          <HomeCollection
            collection="luoghi"
            title={home.luoghi.title}
            text={home.luoghi.testo as SerializedEditorState}
            locale={locale}
          />
          <HomeCollection
            collection="residenze"
            title={home.residenze.title}
            text={home.residenze.testo as SerializedEditorState}
            locale={locale}
          />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return (
      <div>
        {locale === 'it' ? 'Errore nel caricamento del contenuto' : 'Error loading content'}
      </div>
    )
  }
}
