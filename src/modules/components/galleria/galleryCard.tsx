import Image from 'next/image'
import { RenderImageContext, RenderImageProps } from 'react-photo-album'
import { getRandomPixel } from '@/modules/utils/getRandomPixel'

//

export function GalleryCardFactory(options: { className?: string } = {}) {
  return function GalleryCard(
    { alt = '', title, sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContext,
  ) {
    const pixel = getRandomPixel()

    return (
      <div
        style={{
          width: '100%',
          position: 'relative',
          aspectRatio: `${width} / ${height}`,
        }}
        className={`rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border-2 ${options.className}`}
      >
        <div
          style={{ backgroundImage: pixel.cssUrl, backgroundSize: '20%' }}
          className="absolute inset-0 bg-gray-300 animate-pulse"
        />
        <Image
          fill
          src={photo}
          alt={alt}
          title={title}
          sizes={sizes}
          placeholder={'blurDataURL' in photo ? 'blur' : undefined}
        />
      </div>
    )
  }
}
