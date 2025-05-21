interface PixelBorderProps {
  color?: string
  className?: string
}

const PixelBorder: React.FC<PixelBorderProps> = ({ className }) => {
  const pixelPath = `/pixels/p${Math.floor(Math.random() * 5)}.svg`

  // TODO - add -webkit-mask-image
  const maskImage = `url(${pixelPath})`

  return (
    <div
      style={{ maskImage, maskSize: 'contain' }}
      className={`h-20 w-full bg-green-600 ${className}`}
    ></div>
  )
}

export default PixelBorder
