//Boilerplate
import React from 'react'
//UI
import { Search, Calendar, X } from 'lucide-react'
//Components
import { TagFilter } from './TagFilter'
//Locale
import { useTranslations } from 'next-intl'

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  dateFilter: string
  setDateFilter: (value: string) => void
  selectedTags: string[]
  toggleTag: (tag: string) => void
  clearTags: () => void
  clearAllFilters: () => void
  allTags: string[]
  isMobile: boolean
  hasActiveFilters: boolean
  messages: ReturnType<typeof useTranslations>
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  selectedTags,
  toggleTag,
  clearTags,
  clearAllFilters,
  allTags,
  isMobile,
  hasActiveFilters,
  messages,
}) => {
  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder={messages('search')}
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
            <option value="all">{messages('allDates')}</option>
            <option value="month">{messages('lastMonth')}</option>
            <option value="3months">{messages('last3Months')}</option>
            <option value="6months">{messages('last6Months')}</option>
            <option value="year">{messages('lastYear')}</option>
          </select>
        </div>

        {/* Tag filter */}
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          clearTags={clearTags}
          isMobile={isMobile}
        />

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center text-xs text-gray-600 hover:text-articoliColor"
          >
            <X className="h-3 w-3 mr-1" />
            {messages('clearFilters')}
          </button>
        )}
      </div>
    </div>
  )
}
