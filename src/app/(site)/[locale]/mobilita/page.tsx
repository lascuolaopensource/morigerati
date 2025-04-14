//Boilerplate
import React from 'react'
//DB
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { loadDb } from '@/utils/db'
//Components
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
//Locale
import { getLocale } from 'next-intl/server'
import { RandomLetter } from '@/components/home/randomLetter'

const Mobilita = async () => {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
    locale: locale,
  })

  return (
    <ContentPageLayout
      coverImage={mobilita.copertina}
      richTextContent={mobilita.testo as SerializedEditorState}
      galleryItems={mobilita.galleria}
    >
      <main className="max-w-screen-xl mx-auto relative py-8">
        <RandomLetter color="articoli" position={'right'} />
      </main>
    </ContentPageLayout>
  )
}

export default Mobilita
