import React from 'react'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
}

const SmallCard: React.FC<Articolo> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="bg-transparent border border-black rounded-lg flex flex-col h-full">
      <div className="p-4 flex flex-col h-full">
        <h1 className="font-bold text-xs">{title}</h1>

        <div className="flex-grow"></div>
      </div>
    </div>
  )
}

export default SmallCard
