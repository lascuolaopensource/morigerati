//Boilerplate
import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { loadDb } from '@/utils/db'
import { Residenze } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import SelectResidenzeView, { FilterType } from './_partials/selectResidenzeView'
import NoResidenze from './_partials/noResidenze'
import { getLocale, getMessages } from 'next-intl/server'

import { createMetadata } from '@/utils/metadataHelpers'
import { CollectionHeading } from '@/components/pageLayout/collectionHeading'
import { CollectionGrid } from '@/components/pageLayout/collectionGrid'
import { Container } from '@/components/uiElements/container'
import CardResidenza from './_partials/cardResidenza'

//

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
  searchParams: Promise<{ filter?: FilterType }>
}

//

export default async function Page({ searchParams }: PageProps) {
  const locale = (await getLocale()) as 'it' | 'en'
  const { filter = 'futura' } = await searchParams
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale: locale })

  const { docs: residenze } = await db.find({
    collection: 'residenze',
    sort: ['data_inizio', 'data_fine'],
    where: {
      data_inizio: {
        greater_than: new Date().toISOString(),
      },
    },
  })

  return (
    <>
      <CollectionHeading
        collection="residenze"
        title={testi.residenze.title}
        introContent={testi.residenze.testo as SerializedEditorState}
      />
      <Container>
        <div className="flex flex-col gap-2">
          {residenze.map((item) => (
            <CardResidenza key={item.id} residenza={item} />
          ))}
        </div>
      </Container>
    </>
  )
}

//

// async function ResidenzeListing({ filter }: { filter?: string }) {
//   const db = await loadDb()

//   const { past, future } = sortResidenze(residenzeData.docs)

//   // Check if filter is 'passata' (past) or 'futura' (future)
//   const isPast = filter === 'passata'
//   const displayResidenze = isPast ? past : future

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-4 w-full">
//         <hr className="border grow" />
//         <SelectResidenzeView />
//         <hr className="border grow" />
//       </div>

//       <div className="py-8">
//         {displayResidenze.length > 0 ? (
//           <CollectionGrid collection="residenze" items={displayResidenze} />
//         ) : (
//           <NoResidenze />
//         )}
//       </div>
//     </div>
//   )
// }

// function groupResidenze = (residenze: ResidenzaType[]): SortedResidenze => {
//   const now = new Date()

//   return residenze.reduce(
//     (acc: SortedResidenze, residenza) => {
//       const comparisonDate = residenza.data_fine
//         ? new Date(residenza.data_fine)
//         : residenza.data_inizio
//         ? new Date(residenza.data_inizio)
//         : null

//       if (!comparisonDate) {
//         acc.past.push(residenza)
//       } else {
//         if (comparisonDate < now) {
//           acc.past.push(residenza)
//         } else {
//           acc.future.push(residenza)
//         }
//       }

//       return acc
//     },
//     { past: [], future: [] },
//   )
// }
