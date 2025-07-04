//Boilerplate
import React from 'react'
import Image, { StaticImageData } from 'next/image'
//Ui
import placeholderImage from '/public/placeholder-image.jpg'
//DB
import type { Media } from '@/payload-types'
//Utils
import { getColorTheme } from '@/modules/utils/colors'
//Locale
import { Link } from '@/modules/i18n/routing'
import { MainCollections, MainCollectionRecord } from '@/modules/types'

interface CardProps {
  category: MainCollections
  record: MainCollectionRecord
  className?: string
}

const Card: React.FC<CardProps> = ({ category, record, className = '' }) => {
  //

  const copertina = record.copertina as Media | undefined
  let cover: string | null | undefined | StaticImageData = copertina?.sizes?.small?.url
  if (copertina?.mimeType?.startsWith('video/')) cover = placeholderImage

  const { bg, border } = getColorTheme(category)

  return (
    <Link
      href={`/${category}/${record.slug}`}
      className={`flex flex-col border-[3px] h-full ${border} ${bg} rounded-lg overflow-hidden duration-300 hover:scale-105 relative cursor-pointer ${className}`}
    >
      <div className="relative h-[200px] aspect-video rounded-md overflow-hidden">
        <Image
          src={cover || placeholderImage}
          alt={copertina?.alt || ''}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <p className="font-medium p-2 pb-1 pt-2">{record.nome}</p>
    </Link>
  )
}

export default Card
