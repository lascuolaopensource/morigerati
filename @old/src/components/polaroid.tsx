import React from 'react'
import Image from 'next/image'

interface PolaroidProps {
  imageUrl: string
  title: string
  color: string
}

const Polaroid: React.FC<PolaroidProps> = ({ imageUrl, title, color }) => {
  return (
    <div className="w-40 pb-1">
      <div className="border-2 border-black rounded overflow-hidden">
        <div className="relative w-full h-32">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className={`${color} p-2 border-t-2 border-black`}>
          <h2 className="text-sm font-bold text-center leading-3">{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default Polaroid
