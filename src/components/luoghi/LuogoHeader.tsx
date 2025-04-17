import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface LuogoHeaderProps {
  nome: string | Record<string, string>
  testo: SerializedEditorState | Record<string, SerializedEditorState>
  locale: 'it' | 'en'
}

export default function LuogoHeader({ nome, testo, locale }: LuogoHeaderProps) {
  const displayName =
    typeof nome === 'object' && nome !== null && 'it' in nome ? nome[locale] || nome.it || '' : nome

  const displayText =
    typeof testo === 'object' && testo !== null && 'it' in testo && 'en' in testo
      ? (testo[locale] as SerializedEditorState)
      : (testo as SerializedEditorState)

  return (
    <div>
      {displayName ? (
        <h1 className="text-4xl text-luogoColorScuro font-bold mb-4">{displayName}</h1>
      ) : (
        <p></p>
      )}
      <div className="mb-6">
        <RichText data={displayText} className="prose prose-lg" />
      </div>
    </div>
  )
}
