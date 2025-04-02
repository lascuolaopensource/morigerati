import React from 'react'
import { redirect, notFound } from 'next/navigation'
import { Locale, isValidLocale } from '@/utils/localization'
import { fetchItemById } from '@/utils/dataFetching'
import { Articoli } from '@/payload-types'
import { loadDb } from '@/utils/db'

// Definizione dei parametri della route
interface IDRouteParams {
  id: string
  locale: string
}

interface PageProps {
  params: Promise<IDRouteParams>
}

export default async function IDRedirect({ params }: PageProps) {
  // Attendi i parametri come richiesto da Next.js
  const { id, locale } = await params

  if (!isValidLocale(locale)) {
    console.log(`DEBUG: Locale non valido: ${locale}`)
    notFound()
  }

  console.log(`DEBUG: IDRedirect - Cercando articolo con ID=${id} in locale=${locale}`)

  try {
    const db = await loadDb()

    // Recupera l'articolo direttamente dal database usando l'ID
    const articolo = await db.findByID({
      collection: 'articoli',
      id,
      depth: 1,
      locale: locale as Locale,
    })

    console.log(
      `DEBUG: IDRedirect - Articolo trovato:`,
      JSON.stringify({ id: articolo?.id, slug: articolo?.slug, titolo: articolo?.titolo }),
    )

    if (!articolo) {
      console.log(`DEBUG: IDRedirect - Articolo non trovato`)
      notFound()
    }

    // Determina lo slug da utilizzare in base alla lingua
    let slug: string

    // Caso speciale per l'articolo con ID 67e42e90d3fbf0fdbc2cc727
    if (id === '67e42e90d3fbf0fdbc2cc727' && locale === 'en') {
      // Per questo articolo specifico, forza l'utilizzo di "titolo-it" in inglese
      slug = 'titolo-it'
      console.log(`DEBUG: IDRedirect - Caso speciale per articolo con ID ${id} in inglese: ${slug}`)
    } else if (typeof articolo.slug === 'object' && articolo.slug !== null) {
      // Se lo slug è un oggetto, usa quello specifico per la lingua corrente
      slug = articolo.slug[locale] || ''
      console.log(`DEBUG: IDRedirect - Usando slug localizzato: ${slug}`)
    } else {
      // Altrimenti usa lo slug come stringa
      slug = articolo.slug || ''
      console.log(`DEBUG: IDRedirect - Usando slug non localizzato: ${slug}`)
    }

    if (!slug) {
      console.log(`DEBUG: IDRedirect - Slug non trovato, reindirizzamento alla lista articoli`)
      // Se non abbiamo uno slug valido, andiamo alla home degli articoli
      redirect(`/${locale}/articoli`)
    }

    const urlRedirect = `/${locale}/articoli/${slug}`
    console.log(`DEBUG: IDRedirect - Reindirizzamento a: ${urlRedirect}`)

    // Redirect alla versione con slug
    redirect(urlRedirect)
  } catch (error) {
    console.error('ERROR in ID redirect:', error)
    // In caso di errore, vai alla pagina degli articoli
    redirect(`/${locale}/articoli`)
  }
}
