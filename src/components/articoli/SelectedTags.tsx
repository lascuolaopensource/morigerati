import React from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { makeSafeForDisplay } from '@/utils/safeDisplay'

interface SelectedTagsProps {
  selectedTags: string[]
  toggleTag: (tag: string) => void
  activeTags: string
}

export const SelectedTags: React.FC<SelectedTagsProps> = ({
  selectedTags,
  toggleTag,
  activeTags,
}) => {
  if (selectedTags.length === 0) return null

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-gray-600 mr-1">{activeTags}</span>
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
  )
}
