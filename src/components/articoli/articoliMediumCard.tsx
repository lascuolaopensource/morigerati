import React from 'react'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
  slugUrl: string
}

const MediumCard: React.FC<Articolo> = ({ title, subtitle, imageUrl, slugUrl }) => {
  return (
    <div className="border-2 border-black rounded-lg overflow-hidden bg-white h-full flex flex-col">
      <div className="flex-grow">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 border-b border-black">&nbsp;</div>
        )}
      </div>
      <div className="p-2">
        <p className="text-center font-bold text-l text-base/tight">{title || ' '}</p>
      </div>
    </div>
  )
}

export default MediumCard
