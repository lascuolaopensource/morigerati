'use client'
import React from 'react'
import { isRichTextEmpty } from '@/utils/isRichtextEmpty'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useTranslation } from '@/components/TranslationProvider'

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
  const { t } = useTranslation()

  // Translations for section headings and labels
  const contactsTitle = t('common:luoghi.contacts', 'Contatti')
  const openingHoursTitle = t('common:luoghi.openingHours', 'Orari di Apertura')
  const servicesTitle = t('common:luoghi.services', 'Servizi')
  const phoneLabel = t('common:luoghi.phone', 'Telefono')
  const emailLabel = t('common:luoghi.email', 'Email')
  const linkLabel = t('common:luoghi.link', 'Link')

  // Determina quali sezioni mostrare
  const hasServizi = servizi && servizi.length > 0
  const hasContatti = contatti && contatti.length > 0

  // Safe check to ensure orari is not an object with locale keys
  const hasOrari = orari && typeof orari === 'object' && !('it' in orari) && !isRichTextEmpty(orari)

  // Se non c'è niente da mostrare, non renderizzare il componente
  if (!hasServizi && !hasContatti && !hasOrari) {
    return null
  }

  // Calcola il numero di colonne da mostrare
  const numCols = [hasServizi, hasContatti, hasOrari].filter(Boolean).length
  const colClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[numCols]

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6 mb-8`}>
      {/* Servizi section */}
      {hasServizi && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{servicesTitle}</h2>
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
          <h2 className="text-2xl font-semibold mb-4">{contactsTitle}</h2>
          <ul>
            {contatti.map((contatto, index) => (
              <li key={index} className="mb-4">
                <p className="font-medium">{contatto.nome}</p>
                {contatto.telefono && (
                  <p className="text-sm">
                    {phoneLabel}: {contatto.telefono}
                  </p>
                )}
                {contatto.email && (
                  <p className="text-sm">
                    {emailLabel}: {contatto.email}
                  </p>
                )}
                {contatto.link && (
                  <p className="text-sm">
                    {linkLabel}:{' '}
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
          <h2 className="text-2xl font-semibold mb-4">{openingHoursTitle}</h2>
          <RichText data={orari as SerializedEditorState} className="prose prose-lg" />
        </div>
      )}
    </div>
  )
}

export default LuogoInfoRow
