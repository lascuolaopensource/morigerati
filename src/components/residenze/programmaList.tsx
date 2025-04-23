//Boilerplate
import React from 'react'
import { Residenze } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ProgrammaListProps {
  residenza: Residenze
  noDetailsText?: string
}

const ProgrammaList: React.FC<ProgrammaListProps> = ({
  residenza,
  noDetailsText = 'Nessun dettaglio disponibile.',
}) => {
  if (!residenza.programma) {
    return null
  }

  if (!Array.isArray(residenza.programma) || residenza.programma.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 max-w-[800px] mx-auto">
      {residenza.programma.map((giorno, index) => (
        <div key={giorno.id || index} className="flex border-t-2 border-residenzeColor pt-2 pb-8">
          <div className="w-2/6 font-bold text-sm break-words">{giorno.programma || ''}</div>
          <div className="w-4/6 pl-1">
            {giorno.testo ? (
              <div className="pl-4">
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
