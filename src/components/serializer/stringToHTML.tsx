import React from 'react'

interface HtmlContentProps {
  htmlString: string
}

const StringToHTML: React.FC<HtmlContentProps> = ({ htmlString }) => {
  return (
    <div className="z-50" style={{ zIndex: 8000, position: 'relative' }}>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  )
}

export default StringToHTML
