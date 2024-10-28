import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import LuogoPixel from '@/public/pixels/cards/luoghi.svg'
import ResidenzePixel from '@/public/pixels/cards/residenze.svg'
import ItinerariPixel from '@/public/pixels/cards/itinerari.svg'
import { Media } from '@/payload-types'
import loremPic from '@/public/loremPic.png'

interface PolaroidProps {
  media: Media | undefined
  title: string
  color: string
  link: string
}

const Polaroid: React.FC<PolaroidProps> = ({ media, title, color, link }) => {
  const borderColor =
    {
      luogoColor: 'border-luogoColorScuro',
      residenzeColor: 'border-residenzeColorScuro',
      itinerarioColor: 'border-itinerarioColorScuro',
    }[color] || 'border-gray-700'

  const isVideo = media?.mimeType?.startsWith('video/')

  return (
    <div className="w-40 pb-1">
      <Link href={link}>
        <div
          className={`border-[1.5px] ${borderColor} rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95`}
        >
          <div className="relative w-full h-32">
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
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image src={media?.url || loremPic} alt={title} fill style={{ objectFit: 'cover' }} />
            )}
          </div>
          <div
            className={`${color} p-1 border-t-2 ${borderColor} flex items-center justify-center relative`}
            style={{ minHeight: '2rem' }}
          >
            {/* Pixel art components positioned behind text */}
            {color === 'bg-luogoColor' && (
              <LuogoPixel
                width={45}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0"
              />
            )}
            {color === 'bg-residenzeColor' && (
              <ResidenzePixel
                width={45}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0"
              />
            )}
            {color === 'bg-itinerarioColor' && (
              <ItinerariPixel
                width={45}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0"
              />
            )}
            {/* Text with higher z-index than Pixels */}
            <h3 className="pt-1 font-semibold text-xs text-center break-words relative z-10">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Polaroid
