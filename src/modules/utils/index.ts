import type { Link } from '#/i18n'

import { ArrowBigDown } from 'lucide-react'
import { ComponentProps } from 'react'
import z from 'zod'

import { Media } from '@/payload-types'

//

export type LinkProps = ComponentProps<typeof Link>
export type IconComponent = ComponentProps<typeof ArrowBigDown>

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0)?.toUpperCase() + string.slice(1)
}

export function getRandomPixel() {
	const pixelPath = `/pixels/p${Math.floor(Math.random() * 5)}.svg`

	return {
		svgPath: pixelPath,
		cssUrl: `url(${pixelPath})`,
	}
}

//

export const databaseKey = z.string()
export type DatabaseKey = z.infer<typeof databaseKey>

export type Relation<T> = T | DatabaseKey | null | undefined

export function getRelation<T>(data: Relation<T>): T | undefined {
	if (!data) return undefined
	const parsed = databaseKey.safeParse(data)
	if (!parsed.success) return data as T
	return undefined
}

export const getMedia = getRelation<Media>
