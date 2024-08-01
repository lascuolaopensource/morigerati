import React from 'react'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

interface ColorcardProps {
  color: string
  title: string
  imageUrl: string | StaticImageData
  slugUrl: string
  previous: string
}

const Colorcard: React.FC<ColorcardProps> = ({ color, title, imageUrl, previous, slugUrl }) => {
  return (
    <Link href={`/${previous}/${slugUrl}`} className="block w-full max-w-md mx-auto pb-1">
      <div className="border-2 border-black rounded overflow-hidden h-40 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105">
        <div className={`${color} p-2 border-b-2 border-black`}>
          <h2 className="text-sm font-bold text-center leading-3">{title}</h2>
        </div>
        <div className="flex-grow overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) s"
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  )
}

export default Colorcard
