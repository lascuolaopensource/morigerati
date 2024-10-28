'use client'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import TagsList from './tagsList'

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

    // Copy styles from the original element
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

const ArchiveCard: React.FC<Articolo> = ({ title, subtitle, media, slugUrl, tags }) => {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)

  const displayTitle = useTruncatedText(title, 48, titleRef)
  const displaySubtitle = useTruncatedText(subtitle, 24, subtitleRef)

  return (
    <Link href={slugUrl} className="block">
      <article className="h-[150px] border-2 border-black rounded-lg flex overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[0.98]">
        <div className="relative w-1/3 border-r border-black">
          {media ? (
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
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>

        <div className="w-2/3 flex flex-col p-3 h-full">
          <div className="mb-2">
            <TagsList tags={tags.filter(Boolean) as string[]} scroll={true} />
          </div>

          <div ref={titleRef} className="text-sm font-bold leading-6">
            {displayTitle}
          </div>

          <div ref={subtitleRef} className="text-xs leading-6 mt-1">
            {displaySubtitle}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default React.memo(ArchiveCard)
