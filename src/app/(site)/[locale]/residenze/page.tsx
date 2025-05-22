//Boilerplate
import React, { Suspense } from 'react'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/utils/db'
import { Residenze as ResidenzaType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
//Components
import CardGrid from '@/components/card/cardsGrid'
import PassateFuture from './_partials/passateFuture'
import NoResidenze from './_partials/noResidenze'
//Locale
import { getLocale, getMessages } from 'next-intl/server'
//Metadata

import { createMetadata } from '@/utils/metadataHelpers'
import { CollectionHeading } from '@/components/pageLayout/collectionHeading'
import { CollectionGrid } from '@/components/pageLayout/collectionGrid'

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

//

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ filter?: string }>
}

//

const Residenze = async ({ params, searchParams }: PageProps) => {
  const locale = (await getLocale()) as 'it' | 'en'
  const { filter = 'futura' } = await searchParams
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale: locale })

  return (
    <>
      <CollectionHeading
        collection="residenze"
        title={testi.residenze.title}
        introContent={testi.residenze.testo as SerializedEditorState}
      />

      <Suspense fallback={<div className="py-8 text-center">Caricamento residenze...</div>}>
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <ResidenzeListing filter={filter} />
        </div>
      </Suspense>
    </>
  )
}

export default Residenze

//

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
        <CollectionGrid collection="residenze" items={displayResidenze} />
      ) : (
        <NoResidenze />
      )}
    </div>
  )
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
