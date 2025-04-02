'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '@/utils/localization'

interface ArticleLanguageSwitcherProps {
  currentLocale: Locale
  articleId: string
  articleSlug: string
  className?: string
}

/**
 * Selettore di lingua semplificato per gli articoli
 */
export default function ArticleLanguageSwitcher({
  currentLocale,
  articleId,
  articleSlug,
  className = '',
}: ArticleLanguageSwitcherProps) {
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)
  const router = useRouter()

  const toggleLocale = () => {
    if (isChangingLanguage) return
    setIsChangingLanguage(true)

    try {
      // Calcola la nuova lingua
      const newLocale: Locale = currentLocale === 'it' ? 'en' : 'it'
      console.log(
        `DEBUG: ArticleLanguageSwitcher - Cambio lingua da ${currentLocale} a ${newLocale}`,
      )
      console.log(`DEBUG: ArticleLanguageSwitcher - ID Articolo: ${articleId}`)

      // Imposta il cookie per la nuova lingua
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`

      // Usa la route di ID per trovare lo slug corretto nella nuova lingua
      // Questo è il modo più affidabile per navigare tra versioni localizzate
      const idRoute = `/${newLocale}/articoli/id/${articleId}`
      console.log(`DEBUG: ArticleLanguageSwitcher - Navigazione a: ${idRoute}`)

      router.push(idRoute)
    } catch (error) {
      console.error('ERROR: Errore nel cambio lingua:', error)
      // In caso di errore, naviga alla lista articoli
      const newLocale: Locale = currentLocale === 'it' ? 'en' : 'it'
      router.push(`/${newLocale}/articoli`)
    } finally {
      // Resetta il flag dopo la navigazione
      setTimeout(() => {
        setIsChangingLanguage(false)
      }, 500)
    }
  }

  // Aggiungi una classe per aiutare a evidenziare il bottone in dev
  const buttonClass = `flex items-center justify-center text-sm uppercase ${className}`

  return (
    <button
      onClick={toggleLocale}
      disabled={isChangingLanguage}
      aria-label="Switch language"
      className={buttonClass}
    >
      {currentLocale === 'it' ? 'EN' : 'IT'}
    </button>
  )
}
