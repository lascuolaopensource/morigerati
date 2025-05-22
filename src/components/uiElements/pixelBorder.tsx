import { getRandomPixel } from '@/utils/getRandomPixel'

interface PixelBorderProps {
  className?: string
}

const PixelBorder: React.FC<PixelBorderProps> = ({ className }) => {
  const pixel = getRandomPixel()

  // TODO - add -webkit-mask-image
  return (
    <div
      style={{ maskImage: pixel.cssUrl, maskSize: 'contain' }}
      className={`h-20 w-full bg-green-600 ${className}`}
    ></div>
  )
}

export default PixelBorder
