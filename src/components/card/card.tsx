// 'use client'
import React from 'react'
import Image from 'next/image'
import { Media, Articoli } from '@/payload-types'
import placeholderImage from '@/public/placeholder-image.jpg'
import Link from 'next/link'
import { CategoryType, styleVariants } from './types'

/**
 * Card Component Props
 */
interface CardProps {
  /** Title displayed in the card */
  title: string
  /** Media to be displayed in the card */
  media: Media | undefined
  /** URL to navigate when card is clicked */
  slugUrl: string
  /** Category determining the styling of the card */
  category: CategoryType
  /** Optional subtitle for article cards */
  subtitle?: string
  /** Optional tags for article cards */
  tags?: string[]
}

/**
 * Card Component
 *
 * Displays a card with an image and title, styled based on its category.
 * The card is clickable and navigates to the provided slugUrl.
 */
const Card: React.FC<CardProps> = ({ title, media, slugUrl, category, subtitle, tags }) => {
  // Determine styling based on category
  const style =
    category === 'articoli'
      ? { border: 'border-itinerariColor bg-itinerariColor', text: 'text-itinerariColor' }
      : styleVariants[category]

  // Determine the image URL to use, fallback to default if not available
  const imageUrl =
    (media && 'url' in media && !media.mimeType?.startsWith('video/') && media.url) ||
    placeholderImage

  // Use a different layout for article cards
  if (category === 'articoli') {
    return (
      <Link href={slugUrl}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 relative">
            <Image src={imageUrl} alt={title} fill className="object-cover" priority />
          </div>
          <div className="p-4">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded">
                    {String(tag)}
                  </span>
                ))}
              </div>
            )}
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
          </div>
        </div>
      </Link>
    )
  }

  // Standard card for other categories
  return (
    <Link href={slugUrl}>
      <div
        className={`flex z-10 flex-col border-[3px] w-[230px] h-full ${style.border} rounded-lg overflow-hidden duration-300 hover:scale-95 relative cursor-pointer`}
      >
        {/* Card Image */}
        <div className="h-[129.60px] flex-shrink-0">
          <Image
            src={imageUrl}
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

        {/* Card Content */}
        <div
          className={`${style.border} px-2 flex flex-col items-center justify-center flex-grow pt-2`}
        >
          <p className="font-semibold text-xs w-full">{title}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
