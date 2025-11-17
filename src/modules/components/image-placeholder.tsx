import { ClassValue } from 'clsx'

import { getRandomPixel } from '../utils'
import { cn } from './shadcn/lib/utils'

//

type Props = {
	className?: ClassValue
	noPulse?: boolean
}

export function ImagePlaceholder(props: Props) {
	const { className, noPulse = false } = props
	const pixel = getRandomPixel()

	return (
		<div
			style={{ backgroundImage: pixel.cssUrl, backgroundSize: '20%' }}
			className={cn(
				'absolute inset-0 opacity-30 bg-black/20 w-full h-full',
				!noPulse && 'animate-pulse',
				className,
			)}
		/>
	)
}
