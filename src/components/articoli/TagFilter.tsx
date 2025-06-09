//Boilerplate
import React, { useRef, useEffect, useState } from 'react'
//UI
import { Tag, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
//Utils
import { makeSafeForDisplay } from '@/utils/safeDisplay'
//Locale
import { useTranslations } from 'next-intl'

interface TagFilterProps {
  allTags: string[]
  selectedTags: string[]
  toggleTag: (tag: string) => void
  clearTags: () => void
  isMobile: boolean
}

export const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  toggleTag,
  clearTags,
  isMobile,
}) => {
  const messages = useTranslations()

  const [tagSearchTerm, setTagSearchTerm] = useState('')
  const [showAllTags, setShowAllTags] = useState(false)
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false)

  const tagDropdownRef = useRef<HTMLDivElement>(null)
  const tagButtonRef = useRef<HTMLButtonElement>(null)

  const initialTagsToShow = 10

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

  // Filter tags based on search term
  const filteredTags = tagSearchTerm
    ? allTags.filter((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
    : allTags

  // Determine which tags to display
  const tagsToDisplay = (() => {
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
    const selectedTagsSet = new Set(selectedTags)
    const additionalSelected = filteredTags.filter(
      (tag) => selectedTagsSet.has(tag) && !initialShown.includes(tag),
    )

    return [...initialShown, ...additionalSelected]
  })()

  // Toggle tag dropdown
  const toggleTagDropdown = () => {
    setIsTagDropdownOpen(!isTagDropdownOpen)
    if (!isTagDropdownOpen) {
      // Reset tag search when opening
      setTagSearchTerm('')
      setShowAllTags(false)
    }
  }

  // Handle mobile tag selection
  const handleMobileTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === '') return
    toggleTag(value)
    // Reset select to default option after selection
    e.target.value = ''
  }

  if (isMobile) {
    return (
      <div className="flex items-center space-x-2">
        <Tag className="h-4 w-4 text-gray-500" />
        <select
          onChange={handleMobileTagChange}
          value=""
          className="bg-white border border-gray-200 rounded-sm py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-articoliColor"
        >
          <option value="" disabled>
            {selectedTags.length > 0
              ? `${messages('articoli.selectedTags')} (${selectedTags.length})`
              : messages('articoli.selectTags')}
          </option>
          <optgroup label={messages('availableTags')}>
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
    )
  }

  return (
    <div className="relative">
      <button
        ref={tagButtonRef}
        onClick={toggleTagDropdown}
        className={`flex items-center space-x-1 bg-white border border-gray-200 rounded-sm py-1 px-2 text-sm hover:border-articoliColor focus:outline-none transition-colors ${
          selectedTags.length > 0 ? 'text-articoliColor border-articoliColor' : 'text-gray-700'
        }`}
      >
        <Tag className="h-4 w-4 mr-1" />
        <span>{messages('articoli.tags')}</span>
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
                placeholder={messages('articoli.searchTags')}
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
                  {tagSearchTerm
                    ? messages('articoli.noTagsFound')
                    : messages('articoli.noTagsAvailable')}
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
                    <ChevronUp className="h-3 w-3 mr-1" /> {messages('articoli.showLessTags')}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" /> {messages('articoli.showAllTags')}{' '}
                    {filteredTags.length} {messages('articoli.tags')}
                  </>
                )}
              </button>
            )}

            {/* Selected tags actions */}
            {selectedTags.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">
                    {messages('articoli.selectedTagsCount')} {selectedTags.length}
                  </span>
                  <button
                    onClick={clearTags}
                    className="text-xs text-articoliColor hover:underline"
                  >
                    {messages('articoli.clearAll')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
