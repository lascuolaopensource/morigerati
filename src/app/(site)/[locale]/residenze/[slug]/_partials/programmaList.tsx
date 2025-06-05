//Boilerplate
import React from 'react'
import type { Residenze } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

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
    <table>
      <tbody>
        {residenza.programma.map((giorno, index) => (
          <tr key={index} className="flex gap-6 border-t-2 border-residenzeColor">
            <td className="font-bold text-xl pt-3">{giorno.programma}</td>
            {giorno.testo ? (
              <td>
                <RichText data={giorno.testo} className="prose prose-lg" />
              </td>
            ) : (
              <td>
                <p>{noDetailsText}</p>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProgrammaList
