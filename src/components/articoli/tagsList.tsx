import React from 'react'
import { Badge } from '@/components/ui/badge'
import { makeSafeForDisplay } from '@/lib/safeDisplay'
import { Locale } from '@/utils/localization'

interface TagsListProps {
  tags: (string | { tag?: string } | any)[]
  className?: string
  locale?: Locale
}

/**
 * Component for displaying a list of tags using shadcn Badge component
 */
export default function TagsList({ tags, className = '', locale = 'it' }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

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
