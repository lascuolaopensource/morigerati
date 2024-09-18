import React from 'react'
import { Articoli } from '@/payload-types'
import ArticoliGrid from '@/components/articoli/articoliGrid'

type SupportedDoc = Articoli

interface articoliCardWrapperProps {
  docs: SupportedDoc[]
  previous: string
}

const ArticoliCardWrapper: React.FC<articoliCardWrapperProps> = ({ docs }) => {
  if (!Array.isArray(docs) || docs.length === 0) {
    return null
  }
  return <ArticoliGrid articoli={docs} />
}

export default ArticoliCardWrapper
