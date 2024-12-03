'use client'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface Articolo {
  title: string
  subtitle: string
  media?: Media | undefined
  slugUrl: string
  tags: (string | null | undefined)[]
}

function useTruncatedText(
  text: string,
  maxHeight: number,
  ref: React.RefObject<HTMLDivElement | null>,
) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!text || !ref.current) return
    const element = ref.current
    const words = text.split(' ')
    let result = ''
    let testDiv = document.createElement('div')
    testDiv.style.cssText = window.getComputedStyle(element).cssText
    testDiv.style.width = element.offsetWidth + 'px'
    testDiv.style.height = 'auto'
    testDiv.style.position = 'absolute'
    testDiv.style.visibility = 'hidden'
    document.body.appendChild(testDiv)

    for (let i = 0; i < words.length; i++) {
      const newText = result + (i > 0 ? ' ' : '') + words[i]
      testDiv.textContent = newText + '...'
      if (testDiv.offsetHeight > maxHeight) {
        setDisplayText(result.trim() + '...')
        break
      }
      result = newText
      if (i === words.length - 1) {
        setDisplayText(text)
      }
    }
    document.body.removeChild(testDiv)
  }, [text, maxHeight])

  return displayText
}

const MediaContent: React.FC<{ media: Media | undefined; title: string }> = ({ media, title }) => {
  if (!media || typeof media === 'string' || media.mimeType?.startsWith('video/')) {
    return <div className="w-full h-full bg-white flex items-center justify-center"></div>
  }

  return (
    <div className="relative h-full">
      <Image
        src={media.url || ''}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 33%"
        priority={false}
      />
    </div>
  )
}

const TagsList: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <span key={index} className="text-xs px-2 py-1 bg-white border border-black">
          {tag}
        </span>
      ))}
    </div>
  )
}

const ArchiveCard: React.FC<Articolo> = ({ title, subtitle, media, slugUrl, tags }) => {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const displayTitle = useTruncatedText(title, 48, titleRef)
  const displaySubtitle = useTruncatedText(subtitle, 24, subtitleRef)

  return (
    <Link href={slugUrl} className="block">
      <article className="h-[200px] sm:h-[220px] border-2 border-black rounded-lg flex overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="relative w-2/5 border-r border-black">
          <MediaContent media={media} title={title} />
        </div>
        <div className="w-3/5 flex flex-col p-4 h-full">
          <div className="mb-3">
            <TagsList tags={tags.filter(Boolean) as string[]} />
          </div>
          <div ref={titleRef} className="text-base font-bold leading-6">
            {displayTitle}
          </div>
          <div ref={subtitleRef} className="text-sm leading-6 mt-2">
            {displaySubtitle}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default React.memo(ArchiveCard)
