'use client'
import React from 'react'
import { useMessages } from 'next-intl'

interface PersonaContactsProps {
  contatti: any
  locale: 'it' | 'en'
}

export default function PersonaContacts({ contatti, locale }: PersonaContactsProps) {
  const messages = useMessages()

  if (!contatti) return null

  // Get only contacts for the current locale
  let contacts = []

  if (typeof contatti === 'object' && contatti !== null) {
    // If it's a localized object with locale keys
    if ('it' in contatti || 'en' in contatti) {
      // Only use contacts for the current locale
      const localeContacts = (contatti as Record<string, any[]>)[locale]
      if (Array.isArray(localeContacts)) {
        contacts = localeContacts
      }
    } else if (Array.isArray(contatti)) {
      // It's already an array (non-localized fallback)
      contacts = contatti
    }
  }

  // Only render if we have contacts for this locale
  if (contacts.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">{messages.luoghi.contacts}</h2>
      <ul className="space-y-4">
        {contacts.map((contatto, index) => (
          <li key={index} className="pb-4 last:pb-0">
            <p className="font-medium text-lg mb-2">{contatto.nome}</p>
            {contatto.telefono && (
              <p className="text-sm mb-1">
                <span className="font-medium">{messages.persone.phone}: </span> {contatto.telefono}
              </p>
            )}
            {contatto.email && (
              <p className="text-sm mb-1">
                <span className="font-medium">{messages.persone.email}: </span> {contatto.email}
              </p>
            )}
            {contatto.link && (
              <p className="text-sm">
                <span className="font-medium">{messages.persone.link}: </span>{' '}
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
  )
}
