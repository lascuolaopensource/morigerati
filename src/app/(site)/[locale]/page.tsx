// Boilerplate
import React from 'react'
import type { Metadata } from 'next'
//PayloadCMS
import { loadDb } from '@/utils/db'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Media, Tracciati as TracciatiType } from '@/payload-types'
//UI
import Copertina from '@/components/uiElements/copertina'
import GridOverlay from '@/components/uiElements/gridOverlay'
import HomeCollection from '@/components/home/homeCollection'
//Locale
import { getLocale } from 'next-intl/server'
import { truncate } from 'node:fs/promises'

//-------------------------------------------------------------------------

/* export async function generateMetadata(): Promise<Metadata> {
  const db = await loadDb()
  const home = await db.findGlobal({ slug: 'home' })

  const metaImage = home?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'

  const title = 'Morigerati - Transluoghi'
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
} */

// Accept params prop which includes the locale
export default async function Page() {
  const locale = (await getLocale()) as 'en' | 'it'

  try {
    const db = await loadDb()

    // Fetch articles with the correct locale (assuming payload supports locale filtering)
    const { docs: articoli } = await db.find({
      collection: 'articoli',
      limit: 3,
      sort: '-data_pubblicazione',
    })

    // Get the home page global with the requested locale
    // Ensure your findGlobal implementation or Payload config handles localization
    const home = await db.findGlobal({
      slug: 'home',
      locale: locale,
    })

    // Check if home data exists for the locale
    if (!home) {
      // Handle case where global data for the specific locale doesn't exist
      // Maybe return a specific message or fallback content
      return <div>Content for '{locale}' not found.</div>
    }

    // Home page component content
    const IntroSection = ({ isMobile = false }) => (
      <div
        className={`${isMobile ? 'sm:hidden' : 'hidden sm:flex flex-col'} md:w-full md:px-40 mb-4`}
      >
        {/* Assuming home.title and home.testo are localized based on the fetched 'home' object */}
        <h2 className={`${isMobile ? 'pt-4 text-xl' : 'text-3xl'} text-center `}>{home.title}</h2>
        <RichText data={home.testo as SerializedEditorState} className="prose-custom" />
      </div>
    )

    return (
      <main className="max-w-screen-xl mx-auto">
        <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw] ">
          {/* Ensure home.cover and home.statement are localized */}
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

          {/* Pass the locale down to components that need it for client-side logic or further fetching */}
          <HomeCollection
            collection="itinerari"
            hasMap={true}
            title={home.itinerari?.title} // Use optional chaining if structure might vary by locale
            text={home.itinerari?.testo as SerializedEditorState}
            tracciati={home.tracciati_mappa as TracciatiType[]}
            singleRow={true}
          />
          <HomeCollection
            collection="luoghi"
            title={home.luoghi?.title}
            text={home.luoghi?.testo as SerializedEditorState}
            singleRow={true}
          />
          <HomeCollection
            collection="residenze"
            title={home.residenze?.title}
            text={home.residenze?.testo as SerializedEditorState}
            singleRow={true}
          />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching page data:', error) // Log the actual error
    return (
      // Consider using translation keys here instead of hardcoded strings
      <div>
        {locale === 'it' ? 'Errore nel caricamento del contenuto' : 'Error loading content'}
      </div>
    )
  }
}
