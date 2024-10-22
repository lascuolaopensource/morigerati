import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface Articolo {
  title: string
  subtitle: string
  imageUrl: string
  slugUrl: string
}

const MediumCard: React.FC<Articolo> = ({ title, subtitle, imageUrl, slugUrl }) => {
  return (
    <Link href={slugUrl || ''}>
      <div className="border-2 border-black rounded-lg overflow-hidden bg-white h-full flex flex-col transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="flex-grow">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 border-b border-black">&nbsp;</div>
          )}
        </div>
        <div className="p-2">
          <p className="text-center font-bold text-xs ">{title || ' '}</p>
        </div>
      </div>
    </Link>
  )
}

export default MediumCard
