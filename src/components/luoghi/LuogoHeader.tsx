import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface LuogoHeaderProps {
  nome: string
  testo: SerializedEditorState
}

export default function LuogoHeader({ nome, testo }: LuogoHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl text-luogoColorScuro font-bold mb-4">{nome}</h1>
      <div className="mb-6">
        <RichText data={testo} className="prose prose-lg" />
      </div>
    </div>
  )
}
