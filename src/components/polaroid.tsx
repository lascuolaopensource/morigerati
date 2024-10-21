import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import LuogoPixel from '@/public/pixels/cards/luoghi.svg'
import ResidenzePixel from '@/public/pixels/cards/residenze.svg'
import ItinerariPixel from '@/public/pixels/cards/itinerari.svg'

interface PolaroidProps {
  imageUrl: string | StaticImageData
  title: string
  color: string
  link: string
}

const Polaroid: React.FC<PolaroidProps> = ({ imageUrl, title, color, link }) => {
  const borderColor =
    {
      luogoColor: 'border-luogoColorScuro',
      residenzeColor: 'border-residenzeColorScuro',
      itinerarioColor: 'border-itinerarioColorScuro',
    }[color] || 'border-gray-700'
  return (
    // <div style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }} className="pt-2 pb-2 pl-2">
    <div className="w-40 pb-1 ">
      <Link href={link}>
        <div
          className={`border-[1.5px] ${borderColor} rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95`}
        >
          <div className="relative w-full h-32">
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          </div>
          <div
            className={`${color} p-1 border-t-2 ${borderColor} flex items-center justify-center relative`}
            style={{ minHeight: '2rem' }}
          >
            {/* Componenti Pixel posizionati dietro al testo */}
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
            {/* Testo con z-index più alto rispetto ai Pixel */}
            <h2 className="text-sm pt-1 font-bold text-center break-words relative z-10">
              {title}
            </h2>
          </div>
        </div>
      </Link>
    </div>

    // </div>
  )
}

export default Polaroid
