import React from 'react'
import { Articoli } from '@/payload-types'
import Image, { StaticImageData } from 'next/image'

import BigCard from './articoliBigCard'
import MediumCard from './articoliMediumCard'
import SmallCard from './articoliSmallCard'

interface ArticoliGridProps {
  articoli: Articoli[]
}

const ArticoliGrid: React.FC<ArticoliGridProps> = ({ articoli }): JSX.Element => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="mb-4 flex-shrink-0">
          <BigCard />
        </div>
        <div className="flex flex-row flex-grow">
          <div className="w-1/2 pr-2">
            <MediumCard />
          </div>
          <div className="w-1/2 flex flex-col pl-2">
            <div className="flex-1 mb-2">
              <SmallCard />
            </div>
            <div className="flex-1 mt-2">
              <SmallCard />
            </div>
          </div>
        </div>
      </div>

      {articoli.map((articolo, n) => (
        <div key={articolo.id}>
          <p>{articolo.titolo ?? 'Senza Titolo'}</p>
          <Image
            src={
              typeof articolo.media === 'string'
                ? articolo.media
                : articolo.media?.url || '/placeholder-image.jpg'
            }
            alt={articolo.titolo || 'Immagine articolo'}
            width={40}
            height={40}
            className="object-cover"
          />
          <p>{n}</p>
        </div>
      ))}
    </>
  )
}

export default ArticoliGrid
