'use client'

import { ClassValue } from 'clsx'

import type { MapProps } from './root-map'

import { cn } from '../shadcn/lib/utils'
import { MapLoader } from './map-loader'

//

type Props = MapProps & {
	className?: ClassValue
}

export function Map(props: Props) {
	const { className, ...rest } = props

	return (
		<div className={cn('h-[400px] border-2 border-black rounded-md overflow-hidden', className)}>
			<MapLoader {...rest} />
		</div>
	)
}
