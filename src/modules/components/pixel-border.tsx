import { getRandomPixel } from '#/utils'
import { cn } from '$/lib/utils'
import { ClassValue } from 'clsx'

//

interface Props {
	className?: ClassValue
}

export function PixelBorder(props: Props) {
	const { className } = props
	const pixel = getRandomPixel()

	const classes = cn('h-20 w-full bg-green-600', className)

	// TODO - add -webkit-mask-image
	return <div style={{ maskImage: pixel.cssUrl, maskSize: 'contain' }} className={classes}></div>
}
