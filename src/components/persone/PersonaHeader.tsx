import React from 'react'
import TagsList from '@/components/articoli/tagsList'

interface PersonaHeaderProps {
  nome: string
  tipologia?: string[] | string | Record<string, string> | null
  indirizzo?: string | Record<string, string> | null
  locale: 'it' | 'en'
  messages: any
}

export default function PersonaHeader({
  nome,
  tipologia,
  indirizzo,
  locale,
  messages,
}: PersonaHeaderProps) {
  return (
    <div>
      {/* Tags/Tipologia */}
      {tipologia && (
        <div className="pt-4">
          <span className="font-medium">{messages.persone.type}: </span>
          <TagsList
            tags={
              Array.isArray(tipologia)
                ? tipologia
                : [
                    typeof tipologia === 'object' && tipologia !== null
                      ? tipologia[locale]
                      : tipologia,
                  ]
            }
          />
        </div>
      )}

      {/* Nome e indirizzo */}
      <div className="mb-6">
        {nome && <h1 className="text-4xl text-stakeholderColorScuro font-bold mb-4">{nome}</h1>}

        {/* Indirizzo - localized field */}
        {indirizzo && (
          <div className="text-gray-700 mb-4">
            <span className="font-medium">{messages.persone.address}: </span>
            {typeof indirizzo === 'object' && indirizzo !== null ? indirizzo[locale] : indirizzo}
          </div>
        )}
      </div>
    </div>
  )
}
