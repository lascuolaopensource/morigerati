'use client'

import React, { useState } from 'react'
import { Articoli } from '@/payload-types'
import ArticoliGrid from '@/components/articoli/articoliGrid'
import TagsList from '@/components/articoli/tagsList'

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
      <div className="pb-4">
        <TagsList tags={uniqueTags} onTagClick={handleTagClick} selectedTag={selectedTag} />
      </div>
      <ArticoliGrid articoli={filteredArticoli} />
    </div>
  )
}

export default ArticoliCardWrapper
