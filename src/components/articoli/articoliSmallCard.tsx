import Link from 'next/link'
import React from 'react'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
  slugUrl: string
}

const SmallCard: React.FC<Articolo> = ({ title, subtitle, imageUrl, slugUrl }) => {
  return (
    <Link href={slugUrl || ''}>
      <div className="bg-transparent border-2 border-black rounded-lg flex flex-col h-full transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="p-4 flex flex-col h-full">
          <h1 className="font-bold text-xs">{title}</h1>

          <div className="flex-grow"></div>
        </div>
      </div>
    </Link>
  )
}

export default SmallCard
