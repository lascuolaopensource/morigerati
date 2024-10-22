import React from 'react'
import Image, { StaticImageData } from 'next/image'
import ReactPlayer from 'react-player/lazy'

interface PolaroidProps {
  imageUrl: string | StaticImageData
}

const ImageCard: React.FC<PolaroidProps> = ({ imageUrl }) => {
  return (
    // <div style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }} className="pt-2 pb-2 pl-2">
    <div className="w-40  pb-1">
      <div className="border-2 border-black rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="relative w-full h-60">
          <Image src={imageUrl} alt="" layout="fill" objectFit="cover" />
          <ReactPlayer url={imageUrl as string} controls={true} />
        </div>
      </div>
    </div>

    // </div>
  )
}

export default ImageCard
