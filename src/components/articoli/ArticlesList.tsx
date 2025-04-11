'use client'

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Articoli, Media } from '@/payload-types'
import { formatDistanceToNow, format, isAfter, parseISO, subMonths } from 'date-fns'
import { it, enUS } from 'date-fns/locale'
import placeholderImage from '@/public/placeholder-image.jpg'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { makeSafeForDisplay } from '@/lib/safeDisplay'
import { Search, Calendar, Tag, X, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { Locale } from '@/utils/localization'
import { useRouter, useSearchParams } from 'next/navigation'

interface ArticlesListProps {
  articles: Articoli[]
  className?: string
  locale?: Locale
}

export default function ArticlesList({
  articles,
  className = '',
  locale = 'it',
}: ArticlesListProps) {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [tagSearchTerm, setTagSearchTerm] = useState('')
  const [showAllTags, setShowAllTags] = useState(false)
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Ref for dropdown positioning and close on outside click
  const tagDropdownRef = useRef<HTMLDivElement>(null)
  const tagButtonRef = useRef<HTMLButtonElement>(null)

  // Initial number of tags to show
  const initialTagsToShow = 10

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check initially
    checkIfMobile()

    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node) &&
        tagButtonRef.current &&
        !tagButtonRef.current.contains(event.target as Node)
      ) {
        setIsTagDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Process all article tags once
  const allTags = useMemo(() => {
    if (!articles) return []

    const tagSet = new Set<string>()

    articles.forEach((article) => {
      const tags = article.tags || []
      tags.forEach((tag: any) => {
        const tagText = typeof tag === 'string' ? tag : tag.tag || ''
        if (tagText) tagSet.add(tagText)
      })
    })

    return Array.from(tagSet).sort()
  }, [articles])

  // Filter tags based on search term
  const filteredTags = useMemo(() => {
    if (!tagSearchTerm) return allTags

    return allTags.filter((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
  }, [allTags, tagSearchTerm])

  // Determine which tags to display based on search, selection, and show all state
  const tagsToDisplay = useMemo(() => {
    // Always show selected tags
    const selectedTagsSet = new Set(selectedTags)

    // If searching tags, show all matches
    if (tagSearchTerm) {
      return filteredTags
    }

    // If showing all tags or there aren't many, show all
    if (showAllTags || filteredTags.length <= initialTagsToShow) {
      return filteredTags
    }

    // Otherwise show a limited number plus any selected ones
    const initialShown = filteredTags.slice(0, initialTagsToShow)
    const additionalSelected = filteredTags.filter(
      (tag) => selectedTagsSet.has(tag) && !initialShown.includes(tag),
    )

    return [...initialShown, ...additionalSelected]
  }, [filteredTags, tagSearchTerm, showAllTags, selectedTags, initialTagsToShow])

  // Format date for display
  const formatDate = (dateString?: string | null) => {
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
  }

  // Process article data
  const processArticle = useCallback(
    (article: Articoli) => {
      const processedTags = article.tags
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
        slug: article.slug,
        imageUrl,
        tags: processedTags,
        date: formatDate(displayDate),
        rawDate: displayDate, // Keep raw date for filtering
      }
    },
    [formatDate, placeholderImage],
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

  // Handle mobile tag selection
  const handleMobileTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === '') return
    toggleTag(value)
    // Reset select to default option after selection
    e.target.value = ''
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    setDateFilter('all')
    setTagSearchTerm('')
  }

  // Toggle tag dropdown
  const toggleTagDropdown = () => {
    setIsTagDropdownOpen(!isTagDropdownOpen)
    if (!isTagDropdownOpen) {
      // Reset tag search when opening
      setTagSearchTerm('')
      setShowAllTags(false)
    }
  }

  if (!articles || articles.length === 0) {
    return (
      <Card className="text-center p-8 bg-gray-50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-serif text-gray-700">
            {locale === 'en' ? 'No articles available' : 'Nessun articolo disponibile'}
          </h3>
          <p className="text-gray-500 mt-2">
            {locale === 'en'
              ? 'Check back soon for new content'
              : 'Torna presto per nuovi contenuti'}
          </p>
        </CardContent>
      </Card>
    )
  }

  const hasActiveFilters = searchTerm || selectedTags.length > 0 || dateFilter !== 'all'

  // Translations for UI text
  const t = {
    search: locale === 'en' ? 'Search by title or content...' : 'Cerca per titolo o contenuto...',
    allDates: locale === 'en' ? 'All dates' : 'Tutte le date',
    lastMonth: locale === 'en' ? 'Last month' : 'Ultimo mese',
    last3Months: locale === 'en' ? 'Last 3 months' : 'Ultimi 3 mesi',
    last6Months: locale === 'en' ? 'Last 6 months' : 'Ultimi 6 mesi',
    lastYear: locale === 'en' ? 'Last year' : 'Ultimo anno',
    selectedTags: locale === 'en' ? 'Selected tags' : 'Tag selezionati',
    selectTags: locale === 'en' ? 'Select tags' : 'Seleziona tag',
    availableTags: locale === 'en' ? 'Available tags' : 'Tag disponibili',
    searchTags: locale === 'en' ? 'Search tags...' : 'Cerca tra i tag...',
    noTagsFound:
      locale === 'en' ? 'No tags found with this search' : 'Nessun tag trovato con questa ricerca',
    noTagsAvailable: locale === 'en' ? 'No tags available' : 'Nessun tag disponibile',
    showLessTags: locale === 'en' ? 'Show fewer tags' : 'Mostra meno tag',
    showAllTags: locale === 'en' ? 'Show all' : 'Mostra tutti i',
    tags: locale === 'en' ? 'tags' : 'tag',
    selectedTagsCount: locale === 'en' ? 'Selected tags:' : 'Tag selezionati:',
    clearAll: locale === 'en' ? 'Clear all' : 'Cancella tutti',
    clearFilters: locale === 'en' ? 'Clear filters' : 'Cancella filtri',
    activeTags: locale === 'en' ? 'Active tags:' : 'Tag attivi:',
    articleFound: locale === 'en' ? 'article found' : 'articolo trovato',
    articlesFound: locale === 'en' ? 'articles found' : 'articoli trovati',
    withSelectedFilters: locale === 'en' ? 'with selected filters' : 'con i filtri selezionati',
    noArticlesFound:
      locale === 'en'
        ? 'No articles found with the selected search criteria.'
        : 'Nessun articolo trovato con i criteri di ricerca selezionati.',
  }

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-articoliColor"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Date filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-sm py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-articoliColor"
            >
              <option value="all">{t.allDates}</option>
              <option value="month">{t.lastMonth}</option>
              <option value="3months">{t.last3Months}</option>
              <option value="6months">{t.last6Months}</option>
              <option value="year">{t.lastYear}</option>
            </select>
          </div>

          {/* Tag filter - Mobile native selector */}
          {isMobile ? (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <select
                onChange={handleMobileTagChange}
                value=""
                className="bg-white border border-gray-200 rounded-sm py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-articoliColor"
              >
                <option value="" disabled>
                  {selectedTags.length > 0
                    ? `${t.selectedTags} (${selectedTags.length})`
                    : t.selectTags}
                </option>
                <optgroup label={t.availableTags}>
                  {allTags.map((tag, index) => (
                    <option
                      key={index}
                      value={tag}
                      style={{ color: selectedTags.includes(tag) ? '#888' : 'inherit' }}
                    >
                      {selectedTags.includes(tag) ? `✓ ${tag}` : tag}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          ) : (
            /* Tag filter button - Desktop dropdown */
            <div className="relative">
              <button
                ref={tagButtonRef}
                onClick={toggleTagDropdown}
                className={`flex items-center space-x-1 bg-white border border-gray-200 rounded-sm py-1 px-2 text-sm hover:border-articoliColor focus:outline-none transition-colors ${
                  selectedTags.length > 0
                    ? 'text-articoliColor border-articoliColor'
                    : 'text-gray-700'
                }`}
              >
                <Tag className="h-4 w-4 mr-1" />
                <span>{t.tags}</span>
                {selectedTags.length > 0 && (
                  <Badge className="ml-1 px-1.5 py-0 text-[10px] bg-articoliColor">
                    {selectedTags.length}
                  </Badge>
                )}
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>

              {/* Tag dropdown */}
              {isTagDropdownOpen && (
                <div
                  ref={tagDropdownRef}
                  className="absolute z-10 mt-1 left-0 w-64 md:w-80 bg-white border border-gray-200 rounded-sm shadow-lg overflow-hidden"
                >
                  <div className="p-3 max-h-80 overflow-y-auto">
                    {/* Tag search input */}
                    <div className="relative mb-3">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t.searchTags}
                        value={tagSearchTerm}
                        onChange={(e) => setTagSearchTerm(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-articoliColor"
                      />
                    </div>

                    {/* Tag list */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tagsToDisplay.length > 0 ? (
                        tagsToDisplay.map((tag, idx) => (
                          <Badge
                            key={idx}
                            className={`cursor-pointer font-normal text-xs px-2 py-0.5 ${
                              selectedTags.includes(tag)
                                ? 'bg-articoliColor hover:bg-articoliColor/90 border-transparent'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {makeSafeForDisplay(tag, 20)}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 py-1">
                          {tagSearchTerm ? t.noTagsFound : t.noTagsAvailable}
                        </p>
                      )}
                    </div>

                    {/* Show more/less button */}
                    {!tagSearchTerm && filteredTags.length > initialTagsToShow && (
                      <button
                        onClick={() => setShowAllTags(!showAllTags)}
                        className="flex items-center text-xs text-articoliColor hover:underline"
                      >
                        {showAllTags ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" /> {t.showLessTags}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" /> {t.showAllTags}{' '}
                            {filteredTags.length} {t.tags}
                          </>
                        )}
                      </button>
                    )}

                    {/* Selected tags actions */}
                    {selectedTags.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">
                            {t.selectedTagsCount} {selectedTags.length}
                          </span>
                          <button
                            onClick={() => setSelectedTags([])}
                            className="text-xs text-articoliColor hover:underline"
                          >
                            {t.clearAll}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-xs text-gray-600 hover:text-articoliColor"
            >
              <X className="h-3 w-3 mr-1" />
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Selected tags display (compact) */}
      {selectedTags.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-600 mr-1">{t.activeTags}</span>
          {selectedTags.map((tag, idx) => (
            <Badge key={idx} className="bg-articoliColor border-transparent text-xs group">
              {makeSafeForDisplay(tag, 15)}
              <X
                className="h-3 w-3 ml-1 cursor-pointer opacity-70 group-hover:opacity-100"
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredArticles.length} {filteredArticles.length === 1 ? t.articleFound : t.articlesFound}
        {hasActiveFilters && ' ' + t.withSelectedFilters}
      </div>

      {/* Articles List */}
      <div className="flex flex-col space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => {
            const processedArticle = processArticle(article)
            const { id, title, subtitle, slug, imageUrl, tags, date } = processedArticle

            return (
              <Card key={id} className="overflow-hidden max-w-full">
                <Link href={`/${locale}/articoli/${slug}`} className="group block h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Article Image */}
                    <div className="relative w-full h-52 md:h-auto md:w-48 md:min-h-[8rem] flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 192px"
                        quality={80}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 flex flex-col h-full">
                      <CardHeader className="pb-2 overflow-hidden flex-1">
                        <CardTitle className="group-hover:text-articoliColor transition-colors line-clamp-3 break-words hyphens-auto">
                          {title}
                        </CardTitle>
                        {subtitle && (
                          <CardDescription className="mt-1 line-clamp-2 break-words hyphens-auto">
                            {subtitle}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardFooter className="py-2 flex flex-wrap items-center gap-2 text-xs text-gray-600 overflow-hidden">
                        {date && (
                          <span className="font-serif italic max-w-[100px] md:max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                            {date}
                          </span>
                        )}

                        {tags && tags.length > 0 && (
                          <>
                            <span className="text-gray-400 mx-1 flex-shrink-0">|</span>
                            <div className="flex-1 flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-1 pr-1">
                              {/* Show fewer tags on mobile */}
                              {tags.slice(0, isMobile ? 1 : 3).map((tag, idx) => (
                                <Badge
                                  key={idx}
                                  className="border font-normal flex-shrink-0 max-w-[100px] md:max-w-[120px] overflow-hidden"
                                >
                                  <span className="truncate block w-full">{tag}</span>
                                </Badge>
                              ))}

                              {/* Show count of additional tags if there are more */}
                              {isMobile && tags.length > 1 && (
                                <Badge className="border font-normal flex-shrink-0 bg-gray-50 text-gray-500">
                                  +{tags.length - 1}
                                </Badge>
                              )}

                              {!isMobile && tags.length > 3 && (
                                <Badge className="border font-normal flex-shrink-0 bg-gray-50 text-gray-500">
                                  +{tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </>
                        )}
                      </CardFooter>
                    </div>
                  </div>
                </Link>
              </Card>
            )
          })
        ) : (
          <div className="text-center p-8 bg-gray-50 border border-gray-200 rounded-sm">
            <p className="text-gray-600">{t.noArticlesFound}</p>
            <button onClick={clearFilters} className="mt-2 text-articoliColor hover:underline">
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
