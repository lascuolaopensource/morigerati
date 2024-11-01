import React from 'react'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { Media } from '@/payload-types'

import loremPic from '@/public/loremPic.png'

interface ColorcardProps {
  color: string
  colorScuro: string
  title: string
  media: Media | undefined
  slugUrl: string
  previous: string
}

const Colorcard: React.FC<ColorcardProps> = ({
  color,
  colorScuro,
  title,
  media,
  previous,
  slugUrl,
}) => {
  const isVideo = media?.mimeType?.startsWith('video/')

  return (
    <Link href={`/${previous}/${slugUrl}`} className="block w-full max-w-[100%] mx-auto pb-2">
      <div
        className={`border-2 border-${colorScuro} rounded overflow-hidden h-[160px] flex flex-col transition-transform duration-300 ease-in-out hover:scale-105`}
      >
        <div className={`bg-${color} border-b-2 border-${colorScuro}`}>
          <h3 className="text-xs font-semibold pb-3 pt-3 text-center leading-3">{title}</h3>
        </div>
        <div className="flex-grow overflow-hidden relative">
          {isVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            >
              <source src={media?.url || ''} type={media?.mimeType || ''} />
            </video>
          ) : (
            <Image
              src={media?.url || loremPic}
              alt={title}
              fill
              sizes="(max-width: 768px) s"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </Link>
  )
}

export default Colorcard
