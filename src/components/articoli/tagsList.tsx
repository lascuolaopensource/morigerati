'use client'
import React from 'react'

interface Tags {
  tags: Array<string | null | undefined>
  onTagClick?: (tag: string) => void
  selectedTag?: string | null
}

const TagsList: React.FC<Tags> = ({ tags, onTagClick, selectedTag }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-xs border-2 py-0.5 px-2 cursor-pointer ${
            tag === selectedTag ? 'bg-black text-white border-black' : 'border-black'
          }`}
          onClick={() => tag && onTagClick && onTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagsList
