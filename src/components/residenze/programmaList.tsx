import React from 'react'
import { Residenze } from '@/payload-types'
import StringToHTML from '../serializer/stringToHTML'

const ProgrammaList: React.FC<{ residenza: Residenze }> = ({ residenza }) => {
  if (!residenza.programma || residenza.programma.length === 0) {
    return ''
  }

  return (
    <div className="space-y-4">
      {residenza.programma.map((giorno, index) => (
        <div key={giorno.id || index} className="flex border-t-2 border-black pt-2">
          <div className="w-2/6 font-bold text-sm break-words">{giorno.programma || ''}</div>
          <div className="w-4/6 pl-1">
            {giorno.testo_html ? (
              <div className="">
                <StringToHTML htmlString={giorno.testo_html ?? ''} />
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
