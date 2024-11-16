import React, { Suspense } from 'react'
import StringToHTML from '../serializer/stringToHTML'
import MySwyper from '../card/wrappers/cardsSwiper'
import { loadDb } from '@/utils/db'
import { RandomPixel } from '@/components/uiElements/pixels'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RandomLetter } from './randomLetter'

interface HomeCollectionProps {
  collection: 'luoghi' | 'itinerari' | 'residenze'
  layout?: 'left' | 'right'
}

const HomeCollection: React.FC<HomeCollectionProps> = async ({ collection, layout = 'left' }) => {
  const db = await loadDb()
  const home = await db.findGlobal({
    slug: 'home',
  })
  const data = await db.find({
    collection: collection,
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
      <div className="text-center md:text-left md:w-full md:px-40 mb-4">
        {layout === 'right' ? (
          <>
            <h2 className={`text-2xl ${color[collection]} text-center md:text-right`}>
              {home[collection].title}
            </h2>
            <div className="text-center md:text-right">
              <StringToHTML
                htmlString={home[collection].text_html ?? ''}
                classs=" max-w-1/4 mx-auto md:ml-auto md:mr-0"
              />
            </div>
          </>
        ) : (
          <>
            <h2 className={`text-2xl ${color[collection]} text-center md:text-left`}>
              {home[collection].title}
            </h2>

            <div className="text-center md:text-left ">
              <StringToHTML
                htmlString={home[collection].text_html ?? ''}
                classs=" max-w-1/4 mx-auto md:ml-0"
              />
            </div>
          </>
        )}
      </div>
      <Suspense fallback={<div>Loading slides...</div>}>
        <MySwyper items={data.docs} category={collection} singleRow={true} />
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
    </section>
  )
}

export default HomeCollection
