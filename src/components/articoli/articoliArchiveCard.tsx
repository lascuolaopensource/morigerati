import Link from 'next/link'
import React from 'react'
import articoliUnpacker from './articoloPropsUnpack'
import TagsList from './tagsList'
import Image from 'next/image'

interface Articolo {
  title: string
  subtitle: string
  imageUrl?: string
  slugUrl: string
  tags: (string | null | undefined)[]
}

const ArchiveCard: React.FC<Articolo> = ({ title, subtitle, imageUrl, slugUrl, tags }) => {
  return (
    <Link href={slugUrl || ''}>
      <div className="h-[150px] bg-transparent border-2 border-black rounded-lg flex transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="w-1/4 h-full">
          <Image
            src={imageUrl || '/placeholder-image.jpg'}
            alt="Copertina Articolo"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg border-r border-black"
          />
        </div>
        <div className="w-3/4 flex flex-col justify-start items-start p-2">
          <TagsList tags={tags} />
          <h3 className="text-xs font-bold">{title}</h3>
          <p className="text-xs">{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}

export default ArchiveCard
