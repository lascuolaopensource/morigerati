import Image, { ImageProps } from 'next/image'
import { getRandomPixel } from './getRandomPixel'
import { cn } from '@/modules/utils/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = Omit<ImageProps, 'src'> & {
  className?: string
  placeholderPulse?: boolean
  src: string | StaticImport | undefined | null
}

export function ImageWithFallback({ className, placeholderPulse, src, ...props }: Props) {
  const pixel = getRandomPixel()

  return (
    <div className={cn('relative rounded-lg overflow-hidden', className)}>
      <div
        style={{ backgroundImage: pixel.cssUrl, backgroundSize: '20%' }}
        className={cn(
          'absolute inset-0 opacity-30 bg-gray/10',
          placeholderPulse && 'animate-pulse',
        )}
      />
      {src && <Image unoptimized fill src={src} {...props} className="object-cover" />}
    </div>
  )
}
