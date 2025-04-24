//Boilerplate
import React from 'react'
//UI
import { Badge } from '@/components/ui/badge'
//Utils
import { makeSafeForDisplay } from '@/lib/safeDisplay'
//Locale
import { getLocale } from 'next-intl/server'

interface TagsListProps {
  tags: (string | { tag?: string } | any)[]
  className?: string
  locale?: string
}

/**
 * Component for displaying a list of tags using shadcn Badge component
 */
export default function TagsList({ tags, className = '', locale: propLocale }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  // Use provided locale prop if available, otherwise get from next-intl
  const locale = propLocale || getLocale()

  return (
    <div className={`flex flex-wrap gap-2 my-3 ${className}`}>
      {tags.map((tag, index) => {
        // Handle tag objects or strings
        const tagText = typeof tag === 'object' && tag ? tag.tag || '' : String(tag)
        const safeTag = makeSafeForDisplay(tagText, 30)

        return (
          <Badge key={index} variant="outline" className="font-normal text-xs px-3 py-1">
            {safeTag}
          </Badge>
        )
      })}
    </div>
  )
}
