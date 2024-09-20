import React from 'react'
import BigCard from './articoliBigCard'
import MediumCard from './articoliMediumCard'
import SmallCard from './articoliSmallCard'
import articoliUnpacker from './articoloPropsUnpack'
import { Articoli } from '@/payload-types'

interface ArticoliGridProps {
  articoli: Articoli[]
}

const ArticoliGrid: React.FC<ArticoliGridProps> = ({ articoli }): JSX.Element => {
  return (
    <div className="flex flex-col h-full">
      {articoli.map((articolo, index) => {
        const { title, subtitle, imageUrl, slugUrl } = articoliUnpacker(articolo)

        if (index === 0) {
          return (
            <div key={articolo.id} className="mb-4 flex-shrink-0">
              <BigCard
                title={title}
                subtitle={subtitle}
                imageUrl={imageUrl}
                slugUrl={`/articoli/${slugUrl}`}
              />
            </div>
          )
        } else {
          const groupIndex = (index - 1) % 3
          if (groupIndex === 0) {
            return (
              <div key={articolo.id} className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <MediumCard
                    title={title}
                    subtitle={subtitle}
                    imageUrl={imageUrl}
                    slugUrl={slugUrl}
                  />
                </div>
                <div className="w-1/2 flex flex-col pl-2">
                  {articoli[index + 1] ? (
                    <div className="flex-1 mb-2">
                      <SmallCard
                        title={articoliUnpacker(articoli[index + 1]).title}
                        subtitle={articoliUnpacker(articoli[index + 1]).subtitle}
                        imageUrl={articoliUnpacker(articoli[index + 1]).imageUrl}
                        slugUrl={articoliUnpacker(articoli[index + 1]).slugUrl}
                      />
                    </div>
                  ) : (
                    <div className="flex-1 mb-2" />
                  )}
                  {articoli[index + 2] ? (
                    <div className="flex-1 mt-2">
                      <SmallCard
                        title={articoliUnpacker(articoli[index + 2]).title}
                        subtitle={articoliUnpacker(articoli[index + 2]).subtitle}
                        imageUrl={articoliUnpacker(articoli[index + 2]).imageUrl}
                        slugUrl={articoliUnpacker(articoli[index + 2]).slugUrl}
                      />
                    </div>
                  ) : (
                    <div className="flex-1 mt-2" />
                  )}
                </div>
              </div>
            )
          }
        }
        return null
      })}
    </div>
  )
}

export default ArticoliGrid
