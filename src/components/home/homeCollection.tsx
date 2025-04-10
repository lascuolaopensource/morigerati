import React, { Suspense } from 'react'

import CardGrid from '../card/cardsGrid'
import { loadDb } from '@/utils/db'
import { RandomPixel } from '@/components/uiElements/pixels'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RandomLetter } from './randomLetter'
import { HomeTracksSection } from './homeTracksSection'
import { Tracciati, Itinerari, Luoghi, Residenze } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Locale } from '@/utils/localization'

// Button text translations
const buttonLabels = {
  it: {
    luoghi: 'Scopri tutti i luoghi',
    itinerari: 'Scopri tutti gli itinerari',
    residenze: 'Consulta il programma',
  },
  en: {
    luoghi: 'Discover all places',
    itinerari: 'Discover all itineraries',
    residenze: 'View the program',
  },
}

// Collection types
type CollectionString = 'luoghi' | 'itinerari' | 'residenze'
type CollectionData = Itinerari[] | Luoghi[] | Residenze[]

// Filter function to get only future residenze (not yet ended)
const filterFutureResidenze = (residenze: Residenze[]): Residenze[] => {
  const now = new Date()
  return residenze.filter((residenza) => {
    // Use end date if available, otherwise use start date
    const comparisonDate = residenza.data_fine
      ? new Date(residenza.data_fine)
      : residenza.data_inizio
        ? new Date(residenza.data_inizio)
        : null

    // If no date is available, keep it
    if (!comparisonDate) return true

    // Only keep residenze that end in the future
    return comparisonDate >= now
  })
}

interface HomeCollectionProps {
  collection: CollectionString | CollectionData
  layout?: 'left' | 'right' | 'grid'
  hasMap?: boolean
  tracciati?: Tracciati[]
  mappaTitle?: string
  mappaText?: string
  title: string
  text: SerializedEditorState
  locale?: Locale
}

const HomeCollection: React.FC<HomeCollectionProps> = async ({
  collection,
  layout = 'left',
  hasMap = false,
  tracciati = [],
  mappaTitle,
  mappaText,
  title,
  text,
  locale = 'it',
}) => {
  const db = await loadDb()

  let data
  let collectionType: CollectionString = 'luoghi' // Default value

  // Determine if collection is a string (collection name) or array of data
  if (typeof collection === 'string') {
    collectionType = collection
    data = await db.find({
      collection: collection,
      sort: 'nome',
      locale,
    })

    // If this is the residenze collection, filter out past events
    if (collectionType === 'residenze') {
      data.docs = filterFutureResidenze(data.docs)
    }
  } else {
    // If collection is an array, figure out what type it is based on first item
    const firstItem = collection[0]
    if (firstItem && 'collection' in firstItem) {
      if (firstItem.collection === 'itinerari') {
        collectionType = 'itinerari'
      } else if (firstItem.collection === 'luoghi') {
        collectionType = 'luoghi'
      } else if (firstItem.collection === 'residenze') {
        collectionType = 'residenze'
      }
    }
    data = { docs: collection }

    // If this is the residenze collection, filter out past events
    if (collectionType === 'residenze') {
      data.docs = filterFutureResidenze(data.docs)
    }
  }

  const color = {
    luoghi: 'text-luoghiColor',
    itinerari: 'text-itinerariColor',
    residenze: 'text-residenzeColor',
  }

  const buttonColor = {
    luoghi: 'bg-luoghiColor hover:bg-luoghiColor/80',
    itinerari: 'bg-itinerariColor hover:bg-itinerariColor/80',
    residenze: 'bg-residenzeColor hover:bg-residenzeColor/80',
  }

  // Get localized button text
  const buttonText = buttonLabels[locale]?.[collectionType] || buttonLabels.it[collectionType]

  return (
    <section className="relative pb-20">
      <RandomLetter color={collectionType} position={layout === 'left' ? 'right' : 'left'} />
      {hasMap ? (
        <>
          <div className="text-center md:text-left md:w-full md:px-40 mb-4">
            <h2 className={`text-2xl ${color[collectionType]} text-center md:text-${layout}`}>
              {title}
            </h2>
            <div className={`text-center md:text-${layout}`}>
              <RichText data={text} className="prose prose-lg" />
            </div>
          </div>
          <Suspense fallback={<div>Loading slides...</div>}>
            <CardGrid items={data.docs} category={collectionType} singleRow={true} />
          </Suspense>
          <HomeTracksSection
            title={mappaTitle}
            text_html={mappaText}
            tracciati={tracciati}
            locale={locale}
          />
          <div className="flex justify-center mt-4">
            <Link
              href={`/${locale}/${collectionType}`}
              className={`${buttonColor[collectionType].split(' ')[0]} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="text-center md:text-left md:w-full md:px-40 mb-4">
            {layout === 'right' ? (
              <>
                <h2 className={`text-2xl ${color[collectionType]} text-center md:text-right`}>
                  {title}
                </h2>
                <div className="text-center md:text-right">
                  <RichText data={text} className="prose prose-lg" />
                </div>
              </>
            ) : (
              <>
                <h2 className={`text-2xl ${color[collectionType]} text-center md:text-left`}>
                  {title}
                </h2>
                <div className="text-center md:text-left ">
                  <RichText data={text} className="prose prose-lg" />
                </div>
              </>
            )}
          </div>
          <Suspense fallback={<div>Loading slides...</div>}>
            <CardGrid items={data.docs} category={collectionType} singleRow={true} />
          </Suspense>
          <div className="flex justify-center mt-4">
            <Link
              href={`/${locale}/${collectionType}`}
              className={`${buttonColor[collectionType].split(' ')[0]} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export default HomeCollection
