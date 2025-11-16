'use client'

import { ClassValue } from 'clsx'
import { useState } from 'react'
import { Photo, RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { z } from 'zod'

import { Media } from '@/payload-types'

import { getMediaRecords, Optional, Relation } from '../utils'
import { Container } from './container'
import { GalleryCardFactory } from './gallery-card'
import { PixelBorder } from './pixel-border'
import { cn } from './shadcn/lib/utils'

//

interface Props {
	items: Optional<Relation<Media>[]>
	className?: ClassValue
	cardClassName?: string
	hidePixelBorder?: boolean
	children?: React.ReactNode
}

export function Gallery(props: Props) {
	const { items, className, cardClassName, hidePixelBorder = false, children } = props

	const [index, setIndex] = useState(-1)

	// TODO - Handle placeholder (use thumbnailURL)

	const photos: Photo[] = getMediaRecords(items)
		.map((item) => ({
			src: item.url,
			width: item.width,
			height: item.height,
		}))
		.filter(isPhoto)

	if (photos.length === 0) return null

	return (
		<>
			{!hidePixelBorder && <PixelBorder className={cn('w-full', className)} />}

			<div className={cn(className)}>
				<Container>
					{children}

					<RowsPhotoAlbum
						render={{
							image: GalleryCardFactory({ className: cardClassName }),
						}}
						photos={photos}
						targetRowHeight={150}
						onClick={({ index: current }) => setIndex(current)}
					/>

					<Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
				</Container>
			</div>
		</>
	)
}

//

const photoSchema = z.object({
	src: z.string(),
	width: z.number(),
	height: z.number(),
})

function isPhoto(item: object): item is Photo {
	return photoSchema.safeParse(item).success
}
