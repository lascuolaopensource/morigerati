import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import { Residenze as ResidenzaType } from '@/payload-types'
import CardGrid from '@/components/card/cardsGrid'
import NoResidenze from '@/components/residenze/noResidenze'
import ResidenzeList from '@/components/residenze/residenzeList'
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

async function ResidenzeListing({ locale }: { locale: Locale }) {
  const db = await loadDb()
  const residenzeData = await db.find({
    collection: 'residenze',
    depth: 2,
    sort: '-data_inizio',
    locale: 'all',
  })

  const { past, future } = sortResidenze(residenzeData.docs)
  const messages = await getMessages(locale, ['common', 'residences'])
  const t = (key: string) => {
    const [namespace, messageKey] = key.split(':')
    return messages[namespace]?.[messageKey] || key
  }

  return (
    <div className="space-y-16">
      {future.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-residenzeColor mb-8">{t('residences:future')}</h2>
          <CardGrid items={future} category="residenze" />
        </div>
      ) : (
        <NoResidenze />
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-residenzeColor mb-8">{t('residences:past')}</h2>
          <ResidenzeList items={past} />
        </div>
      )}
    </div>
  )
}

interface ResidenzePagProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ filter?: string }>
}

const Residenze = async ({ params }: ResidenzePagProps) => {
  const { locale } = await params
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi', locale: locale as 'it' | 'en' })

  return (
    <main className="min-h-screen">
      <div className="p-3 max-w-screen-xl mx-auto">
        {testi.residenze.title && (
          <div className="font-normal text-sm pt-4 leading-4">
            <h1 className="font-bold text-[40px] sm:text-center">{testi.residenze.title}</h1>
          </div>
        )}
        <RichText
          data={testi.residenze.testo as SerializedEditorState}
          className="prose prose-lg"
        />
        <div className="mt-12">
          <Suspense fallback={<div className="py-8 text-center">Caricamento residenze...</div>}>
            <ResidenzeListing locale={locale} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default Residenze
