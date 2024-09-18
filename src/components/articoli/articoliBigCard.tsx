import React from 'react'
import articoliUnpacker from './articoloPropsUnpack'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
}

const BigCard: React.FC<Articolo> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="h-48 bg-transparent border border-black rounded-lg flex">
      <div className="w-1/2 h-full">
        <img
          src={imageUrl || '/placeholder-image.jpg'}
          alt="Placeholder"
          className="object-cover w-full h-full rounded-l-lg border-r border-black"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-start items-start p-2">
        <h3 className="text-xl">{title}</h3>
        <p className="text-xs">{subtitle}</p>
      </div>
    </div>
  )
}

export default BigCard
