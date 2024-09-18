import React from 'react'
import articoliUnpacker from './articoloPropsUnpack'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
}

const MediumCard: React.FC<Articolo> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="border border-black rounded-lg overflow-hidden bg-white h-full flex flex-col">
      <div className="flex-grow">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 border-b border-black">&nbsp;</div>
        )}
      </div>
      <div className="p-2">
        <h3 className="m-0 text-center text-xs">{title || ' '}</h3>
      </div>
    </div>
  )
}

export default MediumCard
