import React from 'react'
import { Residenze } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Locale } from '@/utils/localization'

interface ProgrammaListProps {
  residenza: Residenze
  locale?: Locale
  noDetailsText?: string
}

const ProgrammaList: React.FC<ProgrammaListProps> = ({
  residenza,
  locale = 'it',
  noDetailsText = 'Nessun dettaglio disponibile.',
}) => {
  if (!residenza.programma) {
    return null
  }

  // Handle both localized and non-localized program data
  let programItems = residenza.programma

  // If programma is localized (it's an object with locale keys)
  if (
    typeof residenza.programma === 'object' &&
    !Array.isArray(residenza.programma) &&
    residenza.programma !== null &&
    ((residenza.programma as Record<string, any>).it ||
      (residenza.programma as Record<string, any>).en)
  ) {
    programItems = (residenza.programma as Record<string, any[]>)[locale] || []
  }

  if (!Array.isArray(programItems) || programItems.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 max-w-[800px] mx-auto">
      {programItems.map((giorno, index) => (
        <div key={giorno.id || index} className="flex border-t-2 border-residenzeColor pt-2">
          <div className="w-2/6 font-bold text-sm break-words">{giorno.programma || ''}</div>
          <div className="w-4/6 pl-1">
            {giorno.testo ? (
              <div className="">
                <RichText data={giorno.testo as SerializedEditorState} className="prose prose-lg" />
              </div>
            ) : (
              <p>{noDetailsText}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProgrammaList
