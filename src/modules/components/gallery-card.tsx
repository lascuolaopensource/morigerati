import Image from 'next/image'
import { RenderImageContext, RenderImageProps } from 'react-photo-album'

import { ImagePlaceholder } from './image-placeholder'
import { cn } from './shadcn/lib/utils'

//

export function GalleryCardFactory(options: { className?: string } = {}) {
	return function GalleryCard(
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
				className={cn(
					'rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border-2',
					options.className,
				)}
			>
				<ImagePlaceholder />
				<Image
					fill
					src={photo}
					alt={alt}
					title={title}
					sizes={sizes}
					unoptimized
					placeholder={'blurDataURL' in photo ? 'blur' : undefined}
				/>
			</div>
		)
	}
}
