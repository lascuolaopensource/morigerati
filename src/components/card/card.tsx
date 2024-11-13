'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Media, Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'
import loremPic from '@/public/loremPic.png'
import Link from 'next/link'
import { url } from 'inspector'

type CategoryType = 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'

interface CardProps {
  title: string
  collection: Itinerari | Luoghi | Stakeholder | Residenze
  media: Media | undefined
  slugUrl: string
  category: CategoryType
  titlePosition?: 'top' | 'bottom'
}

const styleVariants = {
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
}

const generateRandomLetter = (): string => {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return Math.random() > 0.5 ? letter.toLowerCase() : letter
}

const MediaContent: React.FC<{ media: Media | undefined; title: string; isVideo: boolean }> = ({
  media,
  title,
  isVideo,
}) => {
  if (isVideo) {
    return (
      <video
        className="w-full h-full object-cover rounded-lg"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source src={media?.url || ''} type={media?.mimeType || ''} />
      </video>
    )
  }

  return (
    <Image
      src={media?.url || loremPic}
      alt={title}
      width={250}
      height={200}
      sizes="(max-width: 768px)"
      className="rounded-lg"
    />
  )
}

const Card: React.FC<CardProps> = ({ title, media, category, titlePosition, slugUrl }) => {
  const [randomLetter, setRandomLetter] = useState<string>('')
  const isVideo = media?.mimeType?.startsWith('video/')
  const titleRef = useRef<HTMLDivElement>(null)
  const [letterTopPosition, setLetterTopPosition] = useState('0.5rem')

  useEffect(() => {
    setRandomLetter(generateRandomLetter())
  }, [])

  useEffect(() => {
    const updateLetterPosition = () => {
      if (titleRef.current) {
        const titleHeight = titleRef.current.offsetHeight
        setLetterTopPosition(`${titleHeight - 14}px`)
      }
    }

    updateLetterPosition()
    const resizeObserver = new ResizeObserver(updateLetterPosition)
    if (titleRef.current) {
      resizeObserver.observe(titleRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [title])

  return (
    <Link href={slugUrl}>
      <div
        className={`flex flex-col border-[3px] w-60 ${styleVariants[category].border} rounded-lg overflow-hidden duration-300 hover:scale-105 relative cursor-pointer`}
      >
        <div
          style={{ top: letterTopPosition }}
          className={`absolute z-20 -right-2 ${styleVariants[category].text}
            p-2 text-5xl font-bold font-transluoghi`}
        >
          {randomLetter}
        </div>{' '}
        <div className="justify-center">
          {titlePosition === 'top' ? (
            <div ref={titleRef} className="pl-2 min-h-[1rem]">
              <p className="pt-1 font-semibold text-xs leading-tight pr-1 ">{title}</p>
            </div>
          ) : null}
          <div className="rounded-lg border-lg">
            <MediaContent media={media} title={title} isVideo={isVideo ?? false} />
          </div>
        </div>
        {titlePosition === 'bottom' ? (
          <div ref={titleRef} className="pl-2">
            <p className="pt-1 font-medium text-xs leading-tight pr-1 ">{title}</p>
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default Card
