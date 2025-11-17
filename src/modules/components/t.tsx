import { cn } from '$/lib/utils'
import { ClassValue } from 'clsx'

//

type Props = {
	children: React.ReactNode
	tag?: 'h1' | 'h2' | 'h3' | 'p'
	className?: ClassValue
}

export function T(props: Props) {
	const { children, tag = 'p', className } = props

	const Tag = tag

	const classes = cn(
		{
			'text-balance': ['h1', 'h2', 'h3'].includes(tag),
			'text-3xl md:text-4xl font-semibold': tag === 'h1',
			'text-2xl md:text-3xl font-semibold': tag === 'h2',
			'text-xl md:text-2xl font-medium': tag === 'h3',
		},
		className,
	)

	return <Tag className={classes}>{children}</Tag>
}
