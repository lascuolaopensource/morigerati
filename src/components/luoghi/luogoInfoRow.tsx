'use client'
import React from 'react'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useMessages } from 'next-intl'

interface Servizio {
  nome: string
  testo_html: string | null
}

interface Contatto {
  nome: string
  telefono?: string
  email?: string
  link?: string
}

interface LuogoInfoRowProps {
  servizi?: Servizio[]
  contatti?: Contatto[]
  orari_html?: string | null
  orari?: { root: any }
}

const LuogoInfoRow: React.FC<LuogoInfoRowProps> = ({ servizi, contatti, orari_html, orari }) => {
  const messages = useMessages()

  // Determina quali sezioni mostrare
  const hasServizi = servizi && servizi.length > 0
  const hasContatti = contatti && contatti.length > 0
  const hasOrari = orari?.root && !isRichTextEmpty(orari)

  // Se non c'è niente da mostrare, non renderizzare il componente
  if (!hasServizi && !hasContatti && !hasOrari) {
    return null
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ap-6 mb-8`}>
      {/* Servizi section */}
      {hasServizi && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{messages.luoghi.services}</h2>
          {servizi.map((servizio, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-xl">{servizio.nome}</h4>
              {/* <RichText data={servizio. as SerializedEditorState} className="prose prose-lg" /> */}
            </div>
          ))}
        </div>
      )}

      {/* Contatti section */}
      {hasContatti && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{messages.luoghi.contacts}</h2>
          <ul>
            {contatti.map((contatto, index) => (
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
          <RichText data={orari} className="prose prose-lg" />
        </div>
      )}
    </div>
  )
}

export default LuogoInfoRow
