import React from 'react'

interface HtmlContentProps {
  htmlString: string
  classs?: string
}

const StringToHTML: React.FC<HtmlContentProps> = ({ htmlString, classs }) => {
  return (
    <div>
      <article
        className={`prose max-w-prose ${classs} `}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    </div>
  )
}

export default StringToHTML
