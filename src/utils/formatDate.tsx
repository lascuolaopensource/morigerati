export default function formatDate(
  date: string | null | undefined,
  seAssente: string,
  anno?: boolean,
  locale: string = 'it',
): string {
  if (!date) {
    return seAssente
  }

  // Mappa corretta per i codici di lingua
  const localeMap = {
    it: 'it-IT',
    en: 'en-GB', // Usiamo en-GB per il formato europeo della data (giorno/mese/anno)
  }

  // Ottieni la locale formattata correttamente
  const formattedLocale = localeMap[locale as keyof typeof localeMap] || 'it-IT'

  let parsedDate = new Date(date).toLocaleDateString(formattedLocale, {
    day: '2-digit',
    month: 'long',
    year: anno ? 'numeric' : undefined,
  })

  // Capitalize month name for Italian locale
  if (locale === 'it') {
    const parts = parsedDate.split(' ')
    if (parts.length > 1) {
      parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
      parsedDate = parts.join(' ')
    }
  }
  // Per l'inglese la capitalizzazione è già corretta

  return parsedDate
}
