import React, { Suspense } from 'react'

import CardGrid from '../card/cardsGrid'
import { loadDb } from '@/utils/db'
import { RandomPixel } from '@/components/uiElements/pixels'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RandomLetter } from './randomLetter'
import { HomeTracksSection } from './homeTracksSection'
import { Tracciati } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface HomeCollectionProps {
  collection: 'luoghi' | 'itinerari' | 'residenze'
  layout?: 'left' | 'right'
  hasMap?: boolean
  tracciati?: Tracciati[]
  mappaTitle?: string
  mappaText?: string
}

const HomeCollection: React.FC<HomeCollectionProps> = async ({
  collection,
  layout = 'left',
  hasMap = false,
  tracciati = [],
  mappaTitle,
  mappaText,
}) => {
  const db = await loadDb()
  const home = await db.findGlobal({
    slug: 'home',
  })
  const data = await db.find({
    collection: collection,
    sort: 'nome',
  })

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

  return (
    <section className="relative pb-20">
      <RandomLetter color={collection} position={layout == 'left' ? 'right' : 'left'} />
      {hasMap ? (
        <>
          <div className="text-center md:text-left md:w-full md:px-40 mb-4">
            <h2 className={`text-2xl ${color[collection]} text-center md:text-${layout}`}>
              {home[collection]?.title}
            </h2>
            <div className={`text-center md:text-${layout}`}>
              <RichText
                data={home[collection].testo as SerializedEditorState}
                className="prose prose-lg"
              />
            </div>
          </div>
          <Suspense fallback={<div>Loading slides...</div>}>
            <CardGrid items={data.docs} category={collection} singleRow={true} />
          </Suspense>
          <HomeTracksSection title={mappaTitle} text_html={mappaText} tracciati={tracciati} />
          <div className="flex justify-center mt-4">
            <Link
              href={`/${collection}`}
              className={`${buttonColor[collection].split(' ')[0]} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
            >
              <span>
                {collection === 'luoghi'
                  ? 'Scopri tutti i luoghi'
                  : collection === 'itinerari'
                    ? 'Scopri tutti gli itinerari'
                    : 'Consulta il programma'}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="text-center md:text-left md:w-full md:px-40 mb-4">
            {layout === 'right' ? (
              <>
                <h2 className={`text-2xl ${color[collection]} text-center md:text-right`}>
                  {home[collection].title}
                </h2>
                <div className="text-center md:text-right">
                  <RichText
                    data={home[collection].testo as SerializedEditorState}
                    className="prose prose-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className={`text-2xl ${color[collection]} text-center md:text-left`}>
                  {home[collection].title}
                </h2>
                <div className="text-center md:text-left ">
                  <RichText
                    data={home[collection].testo as SerializedEditorState}
                    className="prose prose-lg"
                  />
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
              className={`${buttonColor[collection].split(' ')[0]} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
            >
              <span>
                {collection === 'luoghi'
                  ? 'Scopri tutti i luoghi'
                  : collection === 'itinerari'
                    ? 'Scopri tutti gli itinerari'
                    : 'Consulta il programma'}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export default HomeCollection
