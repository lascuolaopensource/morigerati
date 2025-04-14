'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Residenze, Media } from '@/payload-types'
import { Locale } from '@/utils/localization'

type Esperto = NonNullable<Residenze['esperti']>[number]

interface TutorCardProps {
  esperto: Esperto
  locale?: Locale
  translations?: { projects?: string; organizations?: string; expand?: string; collapse?: string }
}

const TutorCard: React.FC<TutorCardProps> = ({ esperto, locale = 'it', translations = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Default translations with fallbacks
  const {
    projects = 'Progetti',
    organizations = 'Organizzazioni',
    expand = 'Espandi',
    collapse = 'Comprimi',
  } = translations

  const renderMedia = (media: Media) => {
    return (
      <Image
        src={(media.url as string) || ''}
        alt={(media.url as string) || ''}
        fill
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  // Get localized nome if available
  const getNome = () => {
    if (typeof esperto.nome === 'object' && esperto.nome !== null) {
      return esperto.nome[locale] || ''
    }
    return esperto.nome || ''
  }

  // Get localized biografia if available
  const getBiografia = () => {
    if (typeof esperto.biografia === 'object' && esperto.biografia !== null) {
      return esperto.biografia[locale] || ''
    }
    return esperto.biografia || ''
  }

  // Get localized progetti if available
  const getProjetti = () => {
    if (!esperto.progetti || esperto.progetti.length === 0) {
      return []
    }

    // If progetti is a localized object
    if (
      typeof esperto.progetti === 'object' &&
      !Array.isArray(esperto.progetti) &&
      esperto.progetti !== null &&
      ((esperto.progetti as Record<string, any>).it || (esperto.progetti as Record<string, any>).en)
    ) {
      return (esperto.progetti as Record<string, any[]>)[locale] || []
    }

    return esperto.progetti
  }

  // Get localized organizzazioni if available
  const getOrganizzazioni = () => {
    if (!esperto.organizzazioni || esperto.organizzazioni.length === 0) {
      return []
    }

    // If organizzazioni is a localized object
    if (
      typeof esperto.organizzazioni === 'object' &&
      !Array.isArray(esperto.organizzazioni) &&
      esperto.organizzazioni !== null &&
      ((esperto.organizzazioni as Record<string, any>).it ||
        (esperto.organizzazioni as Record<string, any>).en)
    ) {
      return (esperto.organizzazioni as Record<string, any[]>)[locale] || []
    }

    return esperto.organizzazioni
  }

  const biografia = getBiografia()
  const progetti = getProjetti()
  const organizzazioni = getOrganizzazioni()

  return (
    <div className="w-full md:w-[48%] bg-residenzeColor/20 overflow-hidden rounded-md">
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
          <h3 className="font-bold text-lg">{getNome()}</h3>
          <div className="flex-grow mt-2">
            <div className="text-sm leading-normal">
              {isExpanded ? (
                <>
                  {biografia}

                  {/* Projects and Organizations */}
                  {progetti && progetti.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-sm mb-1">{projects}</h4>
                      <div className="flex flex-wrap gap-2">
                        {progetti.map((project, index) => (
                          <Link
                            key={index}
                            href={project.link}
                            className="underline hover:text-residenzeColor transition-colors text-sm"
                          >
                            {typeof project.nome === 'object' ? project.nome[locale] : project.nome}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {organizzazioni && organizzazioni.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-sm mb-1">{organizations}</h4>
                      <div className="flex flex-wrap gap-2">
                        {organizzazioni.map((org, index) => (
                          <Link
                            key={index}
                            href={org.link}
                            className="underline hover:text-residenzeColor transition-colors text-sm"
                          >
                            {typeof org.nome === 'object' ? org.nome[locale] : org.nome}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {typeof biografia === 'string' ? biografia.slice(0, 200) : biografia}
                  {typeof biografia === 'string' && biografia.length > 200 && '...'}
                </>
              )}
            </div>
            {typeof biografia === 'string' && biografia.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-residenzeColor font-medium underline mt-2"
              >
                {isExpanded ? collapse : expand}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorCard
