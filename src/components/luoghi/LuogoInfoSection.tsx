'use client'
import React from 'react'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useMessages } from 'next-intl'

interface LuogoInfoSectionProps {
  luogoData: any
}

export default function LuogoInfoSection({ luogoData }: LuogoInfoSectionProps) {
  const messages = useMessages()

  // Extract the data we need
  const contatti = luogoData?.contatti || []
  const orari = luogoData?.orari

  // Determine which sections to show
  const hasContatti = contatti.length > 0
  const hasOrari = orari?.root && !isRichTextEmpty(orari)

  // If nothing to show, don't render the component
  if (!hasContatti && !hasOrari) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Contatti section */}
      {hasContatti && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{messages.luoghi.contacts}</h2>
          <ul>
            {contatti.map((contatto: any, index: number) => (
              <li key={index} className="mb-4">
                <p className="font-medium">{contatto.nome}</p>
                {contatto.telefono && (
                  <p className="text-sm">
                    {messages.luoghi.phone}: {contatto.telefono}
                  </p>
                )}
                {contatto.email && (
                  <p className="text-sm">
                    {messages.luoghi.email}: {contatto.email}
                  </p>
                )}
                {contatto.link && (
                  <p className="text-sm">
                    {messages.luoghi.link}:{' '}
                    <a
                      href={contatto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {contatto.link}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Orari section */}
      {hasOrari && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{messages.luoghi.openingHours}</h2>
          <RichText data={orari as SerializedEditorState} className="prose prose-lg" />
        </div>
      )}
    </div>
  )
}
