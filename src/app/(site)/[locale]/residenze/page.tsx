import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import { Residenze as ResidenzaType } from '@/payload-types'
import PassateFuture from '@/components/residenze/passateFuture'
import CardGrid from '@/components/card/cardsGrid'
import NoResidenze from '@/components/residenze/noResidenze'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { defaultLocale } from '@/middleware'
import { getMessages } from '@/utils/getMessages'
import { Locale } from '@/utils/localization'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

interface PageProps {
  params: Promise<{ locale: Locale }>
}

async function FilteredResidenze({
  filter,
  locale,
}: {
  filter: 'passata' | 'futura'
  locale: Locale
}) {
  const db = await loadDb()
  const residenzeData = await db.find({
    collection: 'residenze',
    depth: 2,
    sort: '-data_inizio',
    locale: 'all',
  })

  const { past, future } = sortResidenze(residenzeData.docs)

  return (
    <div className="space-y-8">
      {filter === 'futura' && future.length > 0 && (
        <CardGrid items={future} category="residenze" singleRow />
      )}

      {filter === 'passata' && past.length > 0 && (
        <CardGrid items={past} category="residenze" singleRow />
      )}

      {filter === 'futura' && future.length === 0 && <NoResidenze />}
    </div>
  )
}

interface ResidenzePagProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ filter?: string }>
}

const Residenze = async ({ searchParams, params }: ResidenzePagProps) => {
  const { locale } = await params
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale: locale as 'it' | 'en' })

  const filter = ((await searchParams).filter as 'passata' | 'futura') || 'futura'
  const messages = await getMessages(locale as Locale, ['common', 'residences'])
  const t = (key: string) => {
    const [namespace, messageKey] = key.split(':')
    return messages[namespace]?.[messageKey] || key
  }

  return (
    <main className="min-h-screen">
      <div className=" p-3 max-w-screen-xl mx-auto ">
        {testi.residenze.title && (
          <div className="font-normal text-sm pt-4 leading-4">
            <h1 className="font-bold text-[40px] sm:text-center">{testi.residenze.title}</h1>
          </div>
        )}
        <RichText
          data={testi.residenze.testo as SerializedEditorState}
          className="prose prose-lg"
        />
        <PassateFuture />
        <Suspense fallback={<div className="py-8 text-center">{t('residences:loading')}</div>}>
          <FilteredResidenze filter={filter} locale={locale} />
        </Suspense>
      </div>
    </main>
  )
}

export default Residenze
