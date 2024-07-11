import React from 'react'
import Link from 'next/link'

interface ColorcardProps {
  color: string
  title: string
  imageUrl: string
  slugUrl: string
}

const Colorcard: React.FC<ColorcardProps> = ({ color, title, imageUrl, slugUrl }) => {
  return (
    <Link href={`/luoghi/${slugUrl}`} className="block w-full max-w-md mx-auto pb-1">
      <div className="border-2 border-black rounded overflow-hidden h-40 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105">
        <div className={`${color} p-2 border-b-2 border-black`}>
          <h2 className="text-sm font-bold text-center leading-3">{title}</h2>
        </div>
        <div className="flex-grow overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </Link>
  )
}

export default Colorcard
