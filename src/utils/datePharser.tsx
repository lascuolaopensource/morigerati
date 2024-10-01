import React from 'react'

export default function datePharser(
  date: string | null | undefined,
  seAssente: string,
  anno?: boolean,
): string {
  if (!date) {
    return seAssente
  }

  const parsedDate = new Date(date).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: anno ? 'numeric' : undefined,
  })

  return parsedDate
}
