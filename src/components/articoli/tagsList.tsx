import { useEffect, useState } from 'react'

interface TagsListProps {
  tags: (string | null | undefined)[]
  onTagClick?: (tag: string) => void
  selectedTag?: string | null
  scroll?: boolean
  scrollDuration?: number // in seconds
}

const TagsList = ({
  tags,
  onTagClick,
  selectedTag,
  scroll = false,
  scrollDuration = 30,
}: TagsListProps) => {
  const [duplicatedTags, setDuplicatedTags] = useState<(string | null | undefined)[]>([])

  useEffect(() => {
    if (scroll) {
      // Duplicate tags enough times to ensure smooth infinite scroll
      setDuplicatedTags(Array(6).fill(tags).flat())
    }
  }, [tags, scroll])

  const handleTagClick = (tag: string | null | undefined) => {
    if (tag && onTagClick) {
      onTagClick(tag)
    }
  }

  const getTagClassName = (tag: string | null | undefined) => {
    const baseClasses = 'text-xs border py-0.5 px-2 cursor-pointer transition-colors duration-200'
    const selectedClasses =
      tag === selectedTag ? 'bg-black text-white border-black' : 'border-black hover:bg-gray-100'

    return `${baseClasses} ${selectedClasses}`
  }

  if (!scroll) {
    return (
      <div className="flex flex-wrap gap-2 pb-4">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={getTagClassName(tag)}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex gap-2 whitespace-nowrap animate-scroll"
        style={{
          animationDuration: `${scrollDuration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {duplicatedTags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={getTagClassName(tag)}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagsList
