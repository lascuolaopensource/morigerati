//Boilerplate
import React, { Suspense } from 'react'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/utils/db'
import { Residenze as ResidenzaType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
//Components
import CardGrid from '@/components/card/cardsGrid'
import PassateFuture from '@/components/residenze/passateFuture'
import NoResidenze from '@/components/residenze/noResidenze'
//Locale
import { getLocale, getMessages } from 'next-intl/server'
import ArchivePageLayout from '@/components/pageLayout/ArchivePageLayout'
//Metadata
import { createMetadata } from '@/utils/metadataHelpers'

// Force dynamic rendering and disable cache to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale: locale })

  return createMetadata(testi.residenze, {
    pagePath: 'residenze',
    titleField: 'title',
    defaultTitle: locale === 'it' ? 'Residenze Artistiche' : 'Artist Residencies',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

interface SortedResidenze {
  past: ResidenzaType[]
  future: ResidenzaType[]
}

const sortResidenze = (residenze: ResidenzaType[]): SortedResidenze => {
  const now = new Date()

  return residenze.reduce(
    (acc: SortedResidenze, residenza) => {
      const comparisonDate = residenza.data_fine
        ? new Date(residenza.data_fine)
        : residenza.data_inizio
          ? new Date(residenza.data_inizio)
          : null

      if (!comparisonDate) {
        acc.past.push(residenza)
      } else {
        if (comparisonDate < now) {
          acc.past.push(residenza)
        } else {
          acc.future.push(residenza)
        }
      }

      return acc
    },
    { past: [], future: [] },
  )
}

async function ResidenzeListing({ filter }: { filter?: string }) {
  const db = await loadDb()
  const messages = await getMessages()

  const residenzeData = await db.find({
    collection: 'residenze',
    depth: 2,
    sort: '-data_inizio',
  })

  const { past, future } = sortResidenze(residenzeData.docs)
  const t = (key: string) => {
    const [namespace, messageKey] = key.split(':')
    return messages[namespace]?.[messageKey] || key
  }

  // Check if filter is 'passata' (past) or 'futura' (future)
  const isPast = filter === 'passata'
  const displayResidenze = isPast ? past : future

  return (
    <div className="space-y-4">
      <PassateFuture />
      {displayResidenze.length > 0 ? (
        <CardGrid items={displayResidenze} category="residenze" />
      ) : (
        <NoResidenze />
      )}
    </div>
  )
}

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ filter?: string }>
}

const Residenze = async ({ params, searchParams }: PageProps) => {
  const locale = (await getLocale()) as 'it' | 'en'
  const { filter = 'futura' } = await searchParams
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale: locale })

  return (
    <ArchivePageLayout
      title={testi.residenze.title}
      introContent={testi.residenze.testo as SerializedEditorState}
      colorTheme="residenze"
    >
      <div className="w-full">
        <Suspense fallback={<div className="py-8 text-center">Caricamento residenze...</div>}>
          <ResidenzeListing filter={filter} />
        </Suspense>
      </div>
    </ArchivePageLayout>
  )
}

export default Residenze
