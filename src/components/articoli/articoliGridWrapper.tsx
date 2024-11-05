'use client'
import React, { useState } from 'react'
import { Articoli } from '@/payload-types'
import ArticoliGrid from '@/components/articoli/articoliGrid'
import TagsList from '@/components/articoli/tagsList'
import ArticoliCard from '@/components/articoli/articoliCard'
import { Media } from '@/payload-types'

type SupportedDoc = Articoli

interface ArticoliCardWrapperProps {
  docs: SupportedDoc[]
  previous: string
}

const ArticoliCardWrapper: React.FC<ArticoliCardWrapperProps> = ({ docs }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const tags = docs.flatMap((doc) => doc.tags?.map((tag) => tag.tag) ?? [])
  const uniqueTags = [...new Set(tags)]

  const filteredArticoli = selectedTag
    ? docs.filter((articolo) => articolo.tags?.some((tag) => tag.tag === selectedTag))
    : docs

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag)
  }

  if (!Array.isArray(docs) || docs.length === 0) {
    return null
  }

  return (
    <div>
      <div className="">
        <TagsList tags={uniqueTags} onTagClick={handleTagClick} selectedTag={selectedTag} />
      </div>

      {selectedTag ? (
        <div className="space-y-4">
          {filteredArticoli.map((articolo) => (
            <ArticoliCard
              key={articolo.id}
              title={articolo.titolo}
              subtitle={articolo.sottotitolo || ''}
              media={articolo.copertina as Media | undefined}
              slugUrl={`/articoli/${articolo.id}`}
              size="big"
            />
          ))}
        </div>
      ) : (
        <ArticoliGrid articoli={filteredArticoli} maxGroups={3} />
      )}
    </div>
  )
}

export default ArticoliCardWrapper
