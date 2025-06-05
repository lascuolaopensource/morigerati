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
import { Button } from '@/components/uiElements/button'

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

  const texts: Record<FilterType, PageTexts> = {
    programma: {
      heading: {
        title: '📆 Programma delle residenze',
        link: {
          label: "Vai all'archivio",
          filter: 'archivio',
        },
      },
      emptyState: {
        title: 'Attualmente, non ci sono residenze in programma',
        cta: "Esplora l'archivio!",
        ctaFilter: 'archivio',
      },
    },
    archivio: {
      heading: {
        title: '📁 Archivio delle residenze',
        link: {
          label: 'Vai al programma',
          filter: 'programma',
        },
      },
      emptyState: {
        title: 'Non ci sono residenze in archivio',
        cta: 'Esplora il programma!',
        ctaFilter: 'programma',
      },
    },
  }

  const { emptyState, heading } = texts[filter]

  return (
    <>
      <CollectionHeading
        collection="residenze"
        title={testi.residenze.title}
        introContent={testi.residenze.testo as SerializedEditorState}
      />
      <Container className="!max-w-screen-lg space-y-6">
        <Heading {...heading} />

        {residenze.length > 0 && (
          <div className="flex flex-col gap-2">
            {residenze.map((item) => (
              <CardResidenza key={item.id} residenza={item} archive={filter === 'archivio'} />
            ))}
          </div>
        )}

        {residenze.length === 0 && (
          <EmptyState title={emptyState.title} color="residenze">
            <div>
              <Button color="residenze" href={filterToHref(emptyState.ctaFilter)}>
                <ArrowRight size={16} />
                <span>{emptyState.cta}</span>
              </Button>
            </div>
          </EmptyState>
        )}
      </Container>
    </>
  )
}

//

type PageTexts = {
  heading: HeadingProps
  emptyState: {
    title: string
    cta: string
    ctaFilter: FilterType
  }
}

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
      <hr className="border grow hidden sm:block" />
      <Button color="residenze" href={filterToHref(link.filter)}>
        <ArrowRight size={16} />
        <span>{link.label}</span>
      </Button>
    </div>
  )
}

function filterToHref(filter: FilterType) {
  return `/residenze?${FILTER_PARAM}=${filter}`
}
