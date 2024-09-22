import React from 'react'

interface HtmlContentProps {
  htmlString: string
}

const StringToHTML: React.FC<HtmlContentProps> = ({ htmlString }) => {
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlString }} />
}

export default StringToHTML
