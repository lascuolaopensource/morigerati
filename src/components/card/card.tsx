//Boilerplate
import React from 'react'
import Image, { StaticImageData } from 'next/image'
//Ui
import placeholderImage from '/public/placeholder-image.jpg'
//DB
import type { Media } from '@/payload-types'
//Utils
import { getColorTheme } from '@/utils/colors'
//Locale
import { Link } from '@/i18n/routing'
import { MainCollections } from '@/utils/types'

interface CardProps {
  title: string
  media?: Media
  slugUrl: string
  category: MainCollections
  className?: string
}

const Card: React.FC<CardProps> = ({ title, media, slugUrl, category, className = '' }) => {
  let cover: string | null | undefined | StaticImageData = media?.sizes?.small?.url

  if (media?.mimeType?.startsWith('video/')) {
    cover = placeholderImage
  }

  const { bg, border } = getColorTheme(category)

  return (
    <Link
      href={slugUrl}
      className={`flex flex-col border-[3px] h-full ${border} ${bg} rounded-lg overflow-hidden duration-300 hover:scale-95 relative cursor-pointer ${className}`}
    >
      <div className="relative h-[160px] aspect-video rounded-md overflow-hidden">
        <Image
          src={cover || placeholderImage}
          alt={media ? media.alt : ''}
          fill
          className="object-cover"
          priority
        />
      </div>

      <p className="font-medium p-2 pb-1 pt-2">{title}</p>
    </Link>
  )
}

export default Card
