import React from 'react'
import { Articoli } from '@/payload-types'

interface ArticoliGridProps {
  articoli: Articoli[]
}

type TextContent = {
  root: {
    children: Array<{
      children: Array<{
        text: string
      }>
    }>
  }
}

const ArticoliGrid: React.FC<ArticoliGridProps> = ({ articoli }): JSX.Element => {
  return (
    <>
      {articoli.map((articolo) => (
        <p key={articolo.id}>{articolo.titolo ?? 'No text available'}</p>
      ))}
    </>
  )
}

export default ArticoliGrid
