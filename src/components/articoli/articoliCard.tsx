import Link from 'next/link'
import Image from 'next/image'
import { type Media } from '@/payload-types'
import { useRef, useEffect, useState } from 'react'

interface ArticoloProps {
  title: string
  subtitle?: string
  media?: Media
  slugUrl: string
  size: 'big' | 'medium' | 'small'
}

function TruncatedText({
  text,
  maxLines,
  className,
}: {
  text: string
  maxLines: number
  className?: string
}) {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const lineHeight = parseFloat(window.getComputedStyle(container).lineHeight)
    const maxHeight = lineHeight * maxLines

    const words = text.split(' ')
    let currentText = ''

    const testDiv = document.createElement('div')
    testDiv.style.cssText = window.getComputedStyle(container).cssText
    testDiv.style.position = 'absolute'
    testDiv.style.visibility = 'hidden'
    testDiv.style.height = 'auto'
    testDiv.style.width = container.offsetWidth + 'px'
    document.body.appendChild(testDiv)

    for (let i = 0; i < words.length; i++) {
      const testText = currentText + (i > 0 ? ' ' : '') + words[i]
      testDiv.textContent = testText

      if (testDiv.offsetHeight > maxHeight) {
        setDisplayText(currentText.trim() + '...')
        break
      }

      currentText = testText

      if (i === words.length - 1) {
        setDisplayText(text)
      }
    }

    document.body.removeChild(testDiv)
  }, [text, maxLines])

  return (
    <div ref={containerRef} className={className}>
      {displayText}
    </div>
  )
}

function MediaContent({
  media,
  title,
  size,
}: {
  media?: Media
  title: string
  size: ArticoloProps['size']
}) {
  const wrapperClass =
    size === 'big'
      ? 'absolute inset-0 w-full h-full [clip-path:inset(0_0_0_0_round_theme(borderRadius.lg_0_0_lg))]'
      : 'absolute inset-0 w-full h-full'

  if (!media?.url) {
    return (
      <div className={wrapperClass}>
        <div className="h-full w-full bg-gray-200" />
      </div>
    )
  }

  if (media.mimeType?.startsWith('video/')) {
    return (
      <div className={wrapperClass}>
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={media.url} type={media.mimeType} />
        </video>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <Image
        src={media.url}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}

function BigCardContent({
  title,
  subtitle,
  media,
}: {
  title: string
  subtitle?: string
  media?: Media
}) {
  return (
    <>
      <div className="relative h-full w-1/2">
        <MediaContent media={media} title={title} size="big" />
      </div>
      <div className="w-1/2 h-full flex flex-col py-2 px-3">
        <TruncatedText text={title} maxLines={4} className="text-sm font-bold mb-1 leading-snug" />
        {subtitle && (
          <TruncatedText text={subtitle} maxLines={4} className="text-xs leading-snug" />
        )}
      </div>
    </>
  )
}

const cardStyles = {
  small: 'bg-transparent border-2 border-black rounded-lg flex flex-col h-full overflow-hidden',
  medium: 'border-2 border-black rounded-lg overflow-hidden bg-white h-full flex flex-col',
  big: 'h-[150px] bg-transparent border-2 border-black rounded-lg flex overflow-hidden',
} as const

export default function ArticoliCard({ title, subtitle, media, slugUrl, size }: ArticoloProps) {
  if (size === 'small') {
    return (
      <Link href={slugUrl} className="block h-full">
        <div className={`${cardStyles[size]} hover:scale-95 transition-transform duration-300`}>
          <div className="flex h-full flex-col p-4">
            <TruncatedText
              text={title}
              maxLines={3}
              className="text-xs font-bold mb-1 leading-snug"
            />
            <div className="flex-grow" />
          </div>
        </div>
      </Link>
    )
  }

  if (size === 'medium') {
    return (
      <Link href={slugUrl} className="block h-full">
        <div className={`${cardStyles[size]} hover:scale-95 transition-transform duration-300`}>
          {media?.url && (
            <div className="relative aspect-video flex-grow">
              <MediaContent media={media} title={title} size={size} />
            </div>
          )}
          <div className={`p-2 flex flex-col ${!media?.url ? 'flex-grow justify-end' : ''}`}>
            <TruncatedText
              text={title}
              maxLines={6}
              className="text-xs font-bold mb-1 leading-snug"
            />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={slugUrl} className="block">
      <div className={`${cardStyles[size]} hover:scale-95 transition-transform duration-300`}>
        <BigCardContent title={title} subtitle={subtitle} media={media} />
      </div>
    </Link>
  )
}
