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
import { MainCollectionRecord, MainCollections } from '@/modules/types'
import { cn } from '@/utils/utils'
import { getLocale } from '@/utils/i18n'
import Card from '../card/card'

//

interface HomeCollectionProps {
  collection: MainCollections
  alignment?: 'left' | 'right'
  title: string
  text: SerializedEditorState
}

const HomeCollection: React.FC<HomeCollectionProps> = async ({
  collection,
  alignment = 'left',
  title,
  text,
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
    locale,
  })) as { docs: MainCollectionRecord[] }

  if (collection === 'residenze') {
    data.docs = filterFutureResidenze(data.docs as Residenze[])
  }

  const sectionClasses = cn(
    'flex flex-col md:flex-row gap-8 md:gap-0 items-center',
    'max-w-screen-xl mx-auto py-12 md:py-18 ',
    {
      'md:flex-row': alignment === 'left',
      'md:flex-row-reverse': alignment === 'right',
    },
  )

  const textClasses = cn(
    {
      'text-left items-start': alignment === 'left',
      'text-right items-end': alignment === 'right',
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
