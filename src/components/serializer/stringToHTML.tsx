import React from 'react'

interface HtmlContentProps {
  htmlString: string
  classs?: string
}

const StringToHTML: React.FC<HtmlContentProps> = ({ htmlString, classs }) => {
  return (
    <div className="z-50" style={{ zIndex: 8000, position: 'relative' }}>
      <article
        className={`prose max-w-prose ${classs} `}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    </div>
  )
}

export default StringToHTML
