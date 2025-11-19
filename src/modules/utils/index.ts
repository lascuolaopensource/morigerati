import type { Link } from '#/i18n'

import { format } from 'date-fns'
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

export const databaseKey = z.number()
export type DatabaseKey = z.infer<typeof databaseKey>

export type Optional<T> = T | null | undefined

export type Relation<T> = T | DatabaseKey

export function getRelation<T>(data: Optional<Relation<T>>): T | undefined {
	if (!data) return undefined
	const parsed = databaseKey.safeParse(data)
	if (!parsed.success) return data as T
	return undefined
}

export function getRelations<T>(data: Optional<Relation<T>[]>): T[] {
	return data?.map(getRelation).filter((t) => t !== undefined) ?? []
}

export const getMedia = getRelation<Media>

export function getMediaRecords(data: Optional<Relation<Media>[]>): Media[] {
	return getRelations(data)
}

//

export function getRandomItem<T>(array: T[] | readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}

//

export function formatDate(date: string | Date): string {
	return format(date, 'dd/MM/yyyy')
}
