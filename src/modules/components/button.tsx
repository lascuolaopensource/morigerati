import type { ComponentProps } from 'react'

import { ClassValue } from 'clsx'
import { ArrowRight } from 'lucide-react'

import { Link } from '@/modules/i18n/navigation'

import { getSectionDisplayData, MainCollection } from '../brand'
import { cn } from './shadcn/lib/utils'

//

type Props = ComponentProps<typeof Link> & {
	className?: ClassValue
	color?: MainCollection
	size?: 'sm' | 'md' | 'lg'
	hideArrow?: boolean
}

export function Button(props: Props) {
	const { children, className, color, size = 'md', hideArrow = false, ...rest } = props
	const { className: themeClassName } = getSectionDisplayData(color)

	const classes = cn(
		'rounded-full px-4 py-2 text-white text-nowrap text-center',
		'hover:cursor-pointer hover:scale-105 transition-transform duration-300',
		'flex items-center justify-center gap-1',
		themeClassName,
		{
			'text-sm': size === 'sm',
			'text-md': size === 'md',
			'text-lg': size === 'lg',
		},
		className,
	)

	return (
		<Link className={classes} {...rest}>
			{children}
			{!hideArrow && <ArrowRight size={16} />}
		</Link>
	)
}
