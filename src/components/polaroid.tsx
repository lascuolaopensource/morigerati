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
      'bg-luogoColor': 'border-luogoColor-scuro',
      'bg-residenzeColor': 'border-residenzeColor-scuro',
      'bg-itinerarioColor': 'border-itinerarioColor-scuro',
    }[color] || 'border-gray-700'
  return (
    <div className="w-40 pb-1 ">
      <Link href={link}>
        <div
          className={`border-[1.5px] ${borderColor} rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95`}
        >
          <div className="relative w-full h-32">
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          </div>
          <div className={`${color} p-2 border-t-2 ${borderColor} flex flex-col relative`}>
            <div className="absolute top-0 left-0">
              {color == 'bg-luogoColor' ? <LuogoPixel width={42} /> : null}
              {color == 'bg-residenzeColor' ? <ResidenzePixel width={42} /> : null}
              {color == 'bg-itinerarioColor' ? <ItinerariPixel width={42} /> : null}
            </div>
            <h2 className="text-sm font-bold text-center leading-3">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Polaroid
