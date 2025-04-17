//Boilerplate
import React, { Suspense } from 'react'
//DB
import { loadDb } from '@/utils/db'
import { Tracciati, Itinerari, Luoghi, Residenze, Persone } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
//UI
import { ArrowRight } from 'lucide-react'
import { RandomLetter } from './randomLetter'
import { bgColors, textColors } from '@/utils/colors'
//Components
import { HomeTracksSection } from './homeTracksSection'
import CardGrid from '../card/cardsGrid'
//Locale
import { Link } from '@/i18n/routing'
import { getMessages, getLocale } from 'next-intl/server'

// Collection types
type CollectionString = 'luoghi' | 'itinerari' | 'residenze' | 'persone'

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
  collection: CollectionString
  layout?: 'left' | 'right' | 'grid'
  hasMap?: boolean
  tracciati?: Tracciati[]
  title: string
  text: SerializedEditorState
  singleRow?: boolean
}

const HomeCollection: React.FC<HomeCollectionProps> = async ({
  collection,
  layout = 'left',
  hasMap = false,
  tracciati = [],
  title,
  text,
  singleRow = true,
}) => {
  const db = await loadDb()
  const messages = await getMessages()
  const locale = (await getLocale()) as 'it' | 'en'
  const color = textColors[collection]
  const buttonColor = bgColors[collection]

  const buttonText = messages.homeButtons[collection]

  let data = (await db.find({
    collection: collection,
    sort: 'nome',
    depth: 2,
  })) as { docs: Itinerari[] | Luoghi[] | Residenze[] | Persone[] }

  if (collection === 'residenze') {
    data.docs = filterFutureResidenze(data.docs)
  }

  return (
    <section className="relative pb-20">
      <RandomLetter color={collection} position={layout === 'left' ? 'right' : 'left'} />
      {hasMap ? (
        <>
          <div className="text-center md:text-left md:w-full md:px-40 mb-4">
            <h2 className={`text-2xl ${color} text-center md:text-${layout}`}>{title}</h2>
            <div className={`text-center md:text-${layout}`}>
              <RichText data={text} className="prose prose-lg" />
            </div>
          </div>
          <Suspense fallback={<div>Loading slides...</div>}>
            <CardGrid items={data.docs} category={collection} singleRow={singleRow} />
          </Suspense>
          <HomeTracksSection tracciati={tracciati} />
          <div className="flex justify-center mt-4">
            <Link
              href={`/${collection}`}
              locale={locale}
              className={`${buttonColor} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
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
                <h2 className={`text-2xl ${color} text-center md:text-right`}>{title}</h2>
                <div className="text-center md:text-right">
                  <RichText data={text} className="prose prose-lg" />
                </div>
              </>
            ) : (
              <>
                <h2 className={`text-2xl ${color} text-center md:text-left`}>{title}</h2>
                <div className="text-center md:text-left ">
                  <RichText data={text} className="prose prose-lg" />
                </div>
              </>
            )}
          </div>
          <Suspense fallback={<div>Loading slides...</div>}>
            <CardGrid items={data.docs} category={collection} singleRow={true} />
          </Suspense>
          <div className="flex justify-center mt-4">
            <Link
              href={`/${collection}`}
              className={`${buttonColor} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
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
