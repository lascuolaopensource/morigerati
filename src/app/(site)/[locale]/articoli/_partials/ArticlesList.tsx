'use client'
//Boilerplate
import React, { useState, useEffect, useMemo, useCallback } from 'react'
//dB
import type { Articoli, Media } from '@/payload-types'
//Utils
import { formatDistanceToNow, isAfter, parseISO, subMonths } from 'date-fns'
import { it, enUS } from 'date-fns/locale'
import placeholderImage from '/public/placeholder-image.jpg'
//Components
import { Card } from '#/components/ui-custom/card'
import { makeSafeForDisplay } from '#/utils/safeDisplay'
import { ArticleCard } from './ArticleCard'
import { SearchFilters } from './SearchFilters'
import { SelectedTags } from './SelectedTags'
//Locale
import { useLocale, useTranslations } from 'next-intl'

interface ArticlesListProps {
  articles: Articoli[]
  className?: string
}

export default function ArticlesList({ articles, className = '' }: ArticlesListProps) {
  const locale = useLocale()
  const messages = useTranslations('articoli')

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Process all article tags once
  const allTags = useMemo(() => {
    if (!articles) return []

    const tagSet = new Set<string>()
    articles.forEach((article) => {
      const tags = Array.isArray(article.tags) ? article.tags : []
      tags.forEach((tag: any) => {
        const tagText = typeof tag === 'string' ? tag : tag.tag || ''
        if (tagText) tagSet.add(tagText)
      })
    })

    return Array.from(tagSet).sort()
  }, [articles])

  // Format date for display
  const formatDate = useCallback(
    (dateString?: string | null) => {
      if (!dateString) return ''
      try {
        const date = new Date(dateString)
        return formatDistanceToNow(date, {
          addSuffix: true,
          locale: locale === 'en' ? enUS : it,
        })
      } catch (e) {
        return ''
      }
    },
    [locale],
  )

  // Process article data
  const processArticle = useCallback(
    (article: Articoli) => {
      const processedTags = Array.isArray(article.tags)
        ? article.tags.map((tag: any) => {
            const tagText = typeof tag === 'string' ? tag : tag.tag || ''
            return makeSafeForDisplay(tagText, 20)
          })
        : []

      const coverImage = article.copertina
        ? typeof article.copertina === 'string'
          ? undefined
          : (article.copertina as Media)
        : undefined

      const imageUrl = coverImage?.url || placeholderImage
      const displayDate = article.data_pubblicazione || article.createdAt

      return {
        id: article.id,
        title: article.titolo ? makeSafeForDisplay(article.titolo, 100) : 'Senza titolo',
        subtitle: article.sottotitolo ? makeSafeForDisplay(article.sottotitolo, 150) : '',
        slug: article.slug || '',
        imageUrl,
        tags: processedTags,
        date: formatDate(displayDate),
        rawDate: displayDate,
      }
    },
    [formatDate],
  )

  // Filter articles based on search term, tags, and date
  const filteredArticles = useMemo(() => {
    if (!articles) return []

    return articles.filter((article) => {
      const processedArticle = processArticle(article)

      // Check search term
      const searchMatch =
        !searchTerm ||
        processedArticle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (processedArticle.subtitle &&
          processedArticle.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))

      // Check tags
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          processedArticle.tags.some(
            (articleTag) => articleTag.toLowerCase() === tag.toLowerCase(),
          ),
        )

      // Check date
      let dateMatch = true
      if (dateFilter !== 'all' && processedArticle.rawDate) {
        const articleDate = parseISO(processedArticle.rawDate)
        const now = new Date()

        switch (dateFilter) {
          case 'month':
            dateMatch = isAfter(articleDate, subMonths(now, 1))
            break
          case '3months':
            dateMatch = isAfter(articleDate, subMonths(now, 3))
            break
          case '6months':
            dateMatch = isAfter(articleDate, subMonths(now, 6))
            break
          case 'year':
            dateMatch = isAfter(articleDate, subMonths(now, 12))
            break
          default:
            dateMatch = true
        }
      }

      return searchMatch && tagMatch && dateMatch
    })
  }, [articles, searchTerm, selectedTags, dateFilter, processArticle])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    setDateFilter('all')
  }

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '' || selectedTags.length > 0 || dateFilter !== 'all'

  if (!articles || articles.length === 0) {
    return (
      <Card className="text-center p-8 bg-gray-50">
        <h3 className="text-xl font-serif text-gray-700">{messages('noArticlesAvailable')}</h3>
        <p className="text-gray-500 mt-2">{messages('checkBackSoon')}</p>
      </Card>
    )
  }

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Search and Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        clearTags={() => setSelectedTags([])}
        clearAllFilters={clearFilters}
        allTags={allTags}
        isMobile={isMobile}
        hasActiveFilters={hasActiveFilters}
        messages={messages}
      />

      {/* Selected tags display */}
      <SelectedTags
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        activeTags={messages('activeTags')}
      />

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredArticles.length}{' '}
        {filteredArticles.length === 1 ? messages('articleFound') : messages('articlesFound')}
        {hasActiveFilters && ' ' + messages('withSelectedFilters')}
      </div>

      {/* Articles List */}
      <div className="flex flex-col space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={processArticle(article)} isMobile={isMobile} />
          ))
        ) : (
          <div className="text-center p-8 bg-gray-50 border border-gray-200 rounded-sm">
            <p className="text-gray-600">{messages('noArticlesFound')}</p>
            <button onClick={clearFilters} className="mt-2 text-articoliColor hover:underline">
              {messages('clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
