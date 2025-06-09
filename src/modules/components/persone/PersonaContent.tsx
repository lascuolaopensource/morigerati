import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface PersonaContentProps {
  testo: any
  locale: 'it' | 'en'
}

export default function PersonaContent({ testo, locale }: PersonaContentProps) {
  if (!testo) return null

  let textContent = null

  // Check if testo is a localized object
  if (typeof testo === 'object' && testo !== null && (testo.it || testo.en)) {
    // Get the content for current locale
    textContent = testo[locale]
  } else {
    // Direct rich text object
    textContent = testo
  }

  return textContent && typeof textContent === 'object' && 'root' in textContent ? (
    <div className="mb-6">
      <RichText data={textContent as SerializedEditorState} className="prose prose-lg" />
    </div>
  ) : null
}
