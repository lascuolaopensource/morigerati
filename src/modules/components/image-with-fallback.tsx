import { ClassValue } from 'clsx'
import Image, { ImageProps } from 'next/image'

import { ImagePlaceholder } from './image-placeholder'
import { cn } from './shadcn/lib/utils'

//

type Props = Omit<ImageProps, 'src' | 'alt'> & {
	src?: string
	alt?: string
	className?: ClassValue
	noPlaceholderPulse?: boolean
}

export function ImageWithFallback(props: Props) {
	const { className, noPlaceholderPulse, src, alt = 'Image', ...restProps } = props

	return (
		<div className={cn('relative overflow-hidden', className)}>
			<ImagePlaceholder noPulse={noPlaceholderPulse} />
			{src && <Image src={src} alt={alt} fill {...restProps} className="object-cover" />}
		</div>
	)
}
