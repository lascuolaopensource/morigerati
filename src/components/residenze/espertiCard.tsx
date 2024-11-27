'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Residenze, Media } from '@/payload-types'

type Esperto = NonNullable<Residenze['esperti']>[number]

const TutorCard: React.FC<{ esperto: Esperto }> = ({ esperto }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const renderMedia = (media: Media) => {
    return (
      <Image
        src={media.url}
        alt={media.alternativeText || ''}
        fill
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  return (
    <div className="w-full bg-residenzeColor/20 overflow-hidden">
      <div className="flex p-4 gap-4">
        {/* Left column - Image */}
        <div className="w-1/3 max-w-[240px]">
          <div className="aspect-square relative overflow-hidden border-2 border-residenzeColor rounded-md">
            <div className="absolute inset-0">
              {esperto.foto ? (
                renderMedia(esperto.foto as Media)
              ) : (
                <div className="w-full h-full bg-residenzeColor/30" />
              )}
            </div>
          </div>
        </div>

        {/* Right column - Content */}
        <div className="w-2/3 flex flex-col -mt-2.5">
          <h3 className="font-bold text-lg">{esperto.nome}</h3>
          <div className="flex-grow mt-2">
            <p className="text-sm leading-normal">
              {isExpanded ? (
                <>
                  {esperto.biografia}
                  
                  {/* Projects and Organizations */}
                  {esperto.progetti && esperto.progetti.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-sm mb-1">Progetti</h4>
                      <div className="flex flex-wrap gap-2">
                        {esperto.progetti.map((project, index) => (
                          <Link
                            key={index}
                            href={project.link}
                            className="underline hover:text-residenzeColor transition-colors text-sm"
                          >
                            {project.nome}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {esperto.organizzazioni && esperto.organizzazioni.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-sm mb-1">Organizzazioni</h4>
                      <div className="flex flex-wrap gap-2">
                        {esperto.organizzazioni.map((org, index) => (
                          <Link
                            key={index}
                            href={org.link}
                            className="underline hover:text-residenzeColor transition-colors text-sm"
                          >
                            {org.nome}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {esperto.biografia?.slice(0, 200)}
                  {esperto.biografia && esperto.biografia.length > 200 && '...'}
                </>
              )}
            </p>
            {esperto.biografia && esperto.biografia.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-residenzeColor font-medium underline mt-2"
              >
                {isExpanded ? 'Comprimi' : 'Espandi'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorCard
