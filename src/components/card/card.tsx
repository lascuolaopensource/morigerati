'use client'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import loremPic from '@/public/loremPic.png'
import Link from 'next/link'

export type CategoryType = 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'

interface CardProps {
  title: string
  media: Media | undefined
  slugUrl: string
  category: CategoryType
}

const styleVariants: Record<CategoryType, { border: string; text: string }> = {
  itinerari: {
    border: 'border-itinerariColor bg-itinerariColor',
    text: 'text-itinerariColor',
  },
  luoghi: {
    border: 'border-luoghiColor bg-luoghiColor',
    text: 'text-luoghiColor',
  },
  stakeholders: {
    border: 'border-stakeholdersColor bg-stakeholdersColor',
    text: 'text-stakeholdersColor',
  },
  residenze: {
    border: 'border-residenzeColor bg-residenzeColor',
    text: 'text-residenzeColor',
  },
} as const

const generateDeterministicLetter = (title: string): string => {
  const sum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const letter = String.fromCharCode(65 + (sum % 26))
  return sum % 2 === 0 ? letter.toLowerCase() : letter
}

const Card = ({ title, media, category, slugUrl }: CardProps) => {
  const randomLetter = useMemo(() => generateDeterministicLetter(title), [title])
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleHeight, setTitleHeight] = useState(0)

  const imageUrl = useMemo(
    () =>
      (media && 'url' in media && !media.mimeType?.startsWith('video/') && media.url) || loremPic,
    [media],
  )

  useEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight)
    }
  }, [title])

  const styles = styleVariants[category]

  return (
    <Link href={slugUrl}>
      <div
        className={`group flex z-10 flex-col border-[3px] w-[240px] ${styles.border} rounded-lg overflow-hidden duration-300 hover:scale-95 relative cursor-pointer h-[180px]`}
      >
        <div className="absolute inset-0 h-[180px]">
          <Image
            src={imageUrl}
            alt={title}
            width={240}
            height={180}
            className="w-full h-full object-cover"
            style={{
              borderRadius: `8px`,
              clipPath: `inset(${titleHeight}px 0 0 0 round 8px 8px 8px 8px)`,
            }}
            priority
          />
        </div>

        <div ref={titleRef} className={`z-10 ${styles.border} px-2 pt-2 -pb-2`}>
          <p className="font-semibold text-xs leading-tight">{title}</p>
        </div>

        {/* <div
          className={`absolute z-20 -right-2 ${styles.text} p-2 text-3xl font-bold font-transluoghi`}
          style={{
            top: `${titleHeight - 17}px`,
          }}
        >
          {randomLetter}
        </div> */}
      </div>
    </Link>
  )
}

export default Card
