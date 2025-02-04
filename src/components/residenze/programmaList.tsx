import React from 'react'
import { Residenze } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const ProgrammaList: React.FC<{ residenza: Residenze }> = ({ residenza }) => {
  if (!residenza.programma || residenza.programma.length === 0) {
    return ''
  }

  return (
    <div className="space-y-4 max-w-[800px] mx-auto">
      {residenza.programma.map((giorno, index) => (
        <div key={giorno.id || index} className="flex border-t-2 border-residenzeColor pt-2">
          <div className="w-2/6 font-bold text-sm break-words">{giorno.programma || ''}</div>
          <div className="w-4/6 pl-1">
            {giorno.testo ? (
              <div className="">
                <RichText data={giorno.testo as SerializedEditorState} className="prose prose-lg" />
              </div>
            ) : (
              <p>Nessun dettaglio disponibile.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProgrammaList
