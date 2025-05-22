//Boilerplate
import React from 'react'

//DB
import { loadDb } from '@/utils/db'
import type { Tracciati, Itinerari, Luoghi, Residenze, Persone, Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

//UI
import { ArrowRight } from 'lucide-react'
import { getColorTheme } from '@/utils/colors'

//Locale
import { Link } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import { MainCollectionRecord, MainCollections } from '@/utils/types'
import { cn } from '@/lib/utils'
import { getLocale } from '@/utils/i18n'
import Card from '../card/card'

//

interface HomeCollectionProps {
  collection: MainCollections
  alignment?: 'left' | 'right'
  hasMap?: boolean
  tracciati?: Tracciati[]
  title: string
  text: SerializedEditorState
  singleRow?: boolean
}

const HomeCollection: React.FC<HomeCollectionProps> = async ({
  collection,
  alignment: layout = 'left',
  hasMap = false,
  tracciati = [],
  title,
  text,
  singleRow = true,
}) => {
  const db = await loadDb()
  const messages = await getMessages()
  const locale = await getLocale()

  const { bg: bgColor, text: textColor } = getColorTheme(collection)

  const buttonText = messages.homeButtons[collection]

  const data = (await db.find({
    collection: collection,
    sort: 'nome',
    depth: 2,
    limit: 2,
  })) as { docs: MainCollectionRecord[] }

  if (collection === 'residenze') {
    data.docs = filterFutureResidenze(data.docs)
  }

  const sectionClasses = cn(
    'flex flex-col md:flex-row gap-8 md:gap-0 items-center',
    'max-w-screen-xl mx-auto py-12 md:py-18 ',
    {
      'md:flex-row': layout === 'left',
      'md:flex-row-reverse': layout === 'right',
    },
  )

  const textClasses = cn(
    {
      'text-left items-start': layout === 'left',
      'text-right items-end': layout === 'right',
    },
    'flex flex-col gap-4 max-w-screen-xl mx-auto px-4 md:px-8',
  )

  return (
    <section className={sectionClasses}>
      <div className={textClasses}>
        <h2 className={`text-2xl ${textColor} font-medium`}>{title}</h2>
        <RichText data={text} className="prose" />
        <ViewAllButton collection={collection} buttonColor={bgColor}>
          {buttonText}
        </ViewAllButton>
      </div>

      <div className="grow grid grid-cols-2 gap-4 px-4 md:px-8">
        {data.docs.map((doc) => (
          <Card key={doc.id} category={collection} record={doc} />
        ))}
      </div>

      {/* <RandomLetter color={collection} position={layout === 'left' ? 'right' : 'left'} />
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
          <div className="flex justify-center mt-4"></div>
        </>
      )} */}
    </section>
  )
}

export default HomeCollection

//

function ViewAllButton(props: {
  collection: MainCollections
  buttonColor: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={`/${props.collection}`}
      className={`${props.buttonColor} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
    >
      <span>{props.children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
    </Link>
  )
}

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
