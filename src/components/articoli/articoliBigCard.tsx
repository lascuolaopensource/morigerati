import Link from 'next/link'
import React from 'react'
import articoliUnpacker from './articoloPropsUnpack'
import Image from 'next/image'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
  slugUrl: string
}

const BigCard: React.FC<Articolo> = ({ title, subtitle, imageUrl, slugUrl }) => {
  return (
    <Link href={slugUrl || ''}>
      <div className="h-[150px] bg-transparent border-2 border-black rounded-lg flex transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="w-1/2 h-full">
          <Image
            src={imageUrl || '/placeholder-image.jpg'}
            alt="Copertina Articolo"
            className="object-cover w-full h-full rounded-l-l border-r border-black"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start p-2">
          <h3 className="text-xs font-bold">{title}</h3>
          <p className="text-xs">{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}

export default BigCard
