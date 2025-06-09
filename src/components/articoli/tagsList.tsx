//Boilerplate
import React from 'react'
//UI
import { Badge } from '@/components/ui/badge'
//Utils
import { makeSafeForDisplay } from '@/modules/utils/safeDisplay'

interface TagsListProps {
  tags: (string | { tag?: string } | any)[]
  className?: string
  locale?: string
}

export default function TagsList({ tags, className = '', locale: propLocale }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-2 my-3 ${className}`}>
      {tags.map((tag, index) => {
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
