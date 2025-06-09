import React from 'react'
//Locale
import { Link } from '@/modules/i18n/routing'
import { useLocale } from 'next-intl'
//DB
import type { Residenze, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ImageWithFallback } from '@/modules/utils/imageWithFallback'
import { getMedia } from '@/modules/utils'

type Esperto = NonNullable<Residenze['esperti']>[number]

interface TutorCardProps {
  esperto: Esperto
  translations?: { projects?: string; organizations?: string }
}

const TutorCard: React.FC<TutorCardProps> = ({ esperto, translations = {} }) => {
  const locale = useLocale()

  // Default translations with fallbacks
  const { projects = 'Progetti', organizations = 'Organizzazioni' } = translations

  // Get localized nome if available
  const getNome = () => {
    if (typeof esperto.nome === 'object' && esperto.nome !== null) {
      return esperto.nome[locale] || ''
    }
    return esperto.nome || ''
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

  const progetti = getProjetti()
  const organizzazioni = getOrganizzazioni()

  const foto = getMedia(esperto.foto)

  const biografia = esperto.biografia as SerializedEditorState
  return (
    <div className="w-full bg-residenzeColor/20 overflow-hidden rounded-md h-auto">
      <div className="flex p-4 gap-4">
        <ImageWithFallback
          src={foto?.url}
          alt={esperto.nome ?? ''}
          className="size-32 shrink-0 bg-residenzeColor/30 object-cover"
        />

        {/* Right column - Content */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{getNome()}</h3>
          <div className="flex-grow mt-2">
            <div className="text-sm leading-normal">
              <RichText data={biografia as SerializedEditorState} />

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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorCard
