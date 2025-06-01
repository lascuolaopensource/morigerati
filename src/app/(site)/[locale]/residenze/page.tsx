import React from 'react'
import { Metadata } from 'next'

import { loadDb } from '@/utils/db'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { getLocale } from '@/utils/i18n'

import { createMetadata } from '@/utils/metadataHelpers'
import { CollectionHeading } from '@/components/pageLayout/collectionHeading'
import { Container } from '@/components/uiElements/container'
import CardResidenza from './_partials/cardResidenza'
import { EmptyState } from '@/components/uiElements/emptyState'
import { T } from '@/components/uiElements/t'
import { ArrowRight } from 'lucide-react'

//

// Force dynamic rendering and disable cache to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
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

const FILTER_PARAM = 'filter'

type FilterType = 'archivio' | 'programma'

interface PageProps {
  searchParams: Promise<{ [FILTER_PARAM]?: FilterType }>
}

//

export default async function Page({ searchParams }: PageProps) {
  const db = await loadDb()
  const locale = await getLocale()

  const filter: FilterType = (await searchParams)[FILTER_PARAM] ?? 'programma'
  const today = new Date().toISOString()

  const testi = await db.findGlobal({ slug: 'testi', locale })

  const { docs: residenze } = await db.find({
    collection: 'residenze',
    sort: ['data_inizio', 'data_fine'],
    locale,
    where: {
      data_inizio: filter == 'programma' ? { greater_than: today } : { less_than: today },
    },
  })

  const headings: Record<FilterType, HeadingProps> = {
    programma: {
      title: 'Programma delle residenze',
      link: {
        label: "Vai all'archivio",
        filter: 'archivio',
      },
    },
    archivio: {
      title: 'Archivio delle residenze',
      link: {
        label: 'Vai al programma',
        filter: 'programma',
      },
    },
  }

  const heading = headings[filter]

  // const residenze = []

  return (
    <>
      <CollectionHeading
        collection="residenze"
        title={testi.residenze.title}
        introContent={testi.residenze.testo as SerializedEditorState}
      />
      <Container className="!max-w-screen-lg">
        <Heading {...heading} />

        {residenze.length > 0 && (
          <div className="flex flex-col gap-2 pt-6">
            {residenze.map((item) => (
              <CardResidenza key={item.id} residenza={item} />
            ))}
          </div>
        )}

        {residenze.length === 0 && (
          <EmptyState
            title="Nessuna residenza trovata"
            description="Nessuna residenza trovata"
            color="residenze"
          />
        )}
      </Container>
    </>
  )
}

//

type HeadingProps = {
  title: string
  link: {
    label: string
    filter: FilterType
  }
}

function Heading(props: HeadingProps) {
  const { title, link } = props

  return (
    <div className="flex items-center gap-6 w-full justify-between">
      <T tag="h2" className="text-residenzeColor">
        {title}
      </T>
      <hr className="border grow hidden md:block" />
      <a
        className="bg-residenzeColor hover:bg-residenzeColor/80 p-2 rounded-md flex items-center gap-1  text-white font-medium"
        href={`/residenze?${FILTER_PARAM}=${link.filter}`}
      >
        <ArrowRight size={16} />
        <span>{link.label}</span>
      </a>
    </div>
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
