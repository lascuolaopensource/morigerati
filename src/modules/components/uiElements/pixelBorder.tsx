import { cn } from '@/modules/utils/utils'
import { getRandomPixel } from '@/modules/utils/getRandomPixel'

interface PixelBorderProps {
  className?: string
}

const PixelBorder: React.FC<PixelBorderProps> = ({ className }) => {
  const pixel = getRandomPixel()

  const classes = cn('h-20 w-full bg-green-600', className)

  // TODO - add -webkit-mask-image
  return <div style={{ maskImage: pixel.cssUrl, maskSize: 'contain' }} className={classes}></div>
}

export default PixelBorder
