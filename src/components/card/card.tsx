// 'use client'
import React from 'react'
import Image from 'next/image'
import placeholderImage from '@/public/placeholder-image.jpg'
import { Link } from '@/i18n/routing'
import { CategoryType } from './types'
import { bgColors, borderColors } from '@/utils/colors'

interface CardProps {
  title: string
  media: string
  slugUrl: string
  category: CategoryType
}

const Card: React.FC<CardProps> = ({ title, media, slugUrl, category }) => {
  return (
    <Link href={slugUrl}>
      <div
        className={`flex z-10 flex-col border-[3px] w-[230px] h-full ${borderColors[category]} ${bgColors[category]} rounded-lg overflow-hidden duration-300 hover:scale-95 relative cursor-pointer`}
      >
        <div className="h-[129.60px] flex-shrink-0">
          <Image
            src={media || placeholderImage}
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
