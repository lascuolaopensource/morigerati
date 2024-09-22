import React from 'react'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

interface ColorcardProps {
  color: string
  colorScuro: string
  title: string
  imageUrl: string | StaticImageData
  slugUrl: string
  previous: string
}

const Colorcard: React.FC<ColorcardProps> = ({
  color,
  colorScuro,
  title,
  imageUrl,
  previous,
  slugUrl,
}) => {
  return (
    <Link href={`/${previous}/${slugUrl}`} className="block w-full max-w-md mx-auto pb-1">
      <div
        className={`border-2 border-${colorScuro} rounded overflow-hidden h-40 flex flex-col transition-transform duration-300 ease-in-out hover:scale-95`}
      >
        <div className={`bg-${color} border-b-2 border-${colorScuro} `}>
          <h2 className="text-sm font-bold pb-3 text-center leading-3">{title}</h2>
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
