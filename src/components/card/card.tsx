//Boilerplate
import React from 'react'
import Image, { StaticImageData } from 'next/image'
//Ui
import placeholderImage from '/public/placeholder-image.jpg'
//Types
import { CategoryType } from './types'
//DB
import type { Media } from '@/payload-types'
//Utils
import { bgColors, borderColors } from '@/utils/colors'
//Locale
import { Link } from '@/i18n/routing'

interface CardProps {
  title: string
  media: Media | undefined
  slugUrl: string
  category: CategoryType
}

const Card: React.FC<CardProps> = ({ title, media, slugUrl, category }) => {
  let cover: string | null | undefined | StaticImageData = media?.sizes?.small?.url
  if (media?.mimeType?.startsWith('video/')) {
    cover = placeholderImage
  }
  return (
    <Link href={slugUrl}>
      <div
        className={`flex z-10 flex-col border-[3px] w-[230px] h-full ${borderColors[category]} ${bgColors[category]} rounded-lg overflow-hidden duration-300 hover:scale-95 relative cursor-pointer`}
      >
        <div className="h-[129.60px] flex-shrink-0">
          <Image
            src={cover || placeholderImage}
            alt={title}
            width={230}
            height={129.6}
            className="w-full h-full object-cover"
            style={{
              borderRadius: `8px 8px 0 0`,
            }}
            priority
          />
        </div>

        <div
          className={`${borderColors[category]} ${bgColors[category]} px-2 flex flex-col items-center justify-center flex-grow pt-2`}
        >
          <p className={`font-semibold text-xs w-full `}>{title}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
