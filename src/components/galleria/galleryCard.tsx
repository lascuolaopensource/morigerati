import Image from 'next/image'
import { RenderImageContext, RenderImageProps } from 'react-photo-album'

export function GalleryCard(
  { alt = '', title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        aspectRatio: `${width} / ${height}`,
      }}
      className="rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
    >
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
