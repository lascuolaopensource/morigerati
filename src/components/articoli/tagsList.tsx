import React from 'react'

interface Tags {
  tags: Array<string | null | undefined>
}

const TagsList: React.FC<Tags> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="text-xs border-2 border-black py-0.5 px-2">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagsList
