import { ClassValue } from 'clsx'

import { getRandomPixel } from '../utils'
import { cn } from './shadcn/lib/utils'

//

type Props = {
	className?: ClassValue
}

export function ImagePlaceholder(props: Props) {
	const { className } = props
	const pixel = getRandomPixel()

	return (
		<div
			style={{ backgroundImage: pixel.cssUrl, backgroundSize: '20%' }}
			className={cn('absolute inset-0 bg-gray-300 animate-pulse', className)}
		/>
	)
}
