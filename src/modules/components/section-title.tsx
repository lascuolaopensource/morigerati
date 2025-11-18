import { ClassValue } from 'clsx'

import { getSectionDisplayData, MainCollection } from '../brand'
import { cn } from './shadcn/lib/utils'

//

export function SectionTitle(props: {
	children: React.ReactNode
	className?: ClassValue
	color?: MainCollection
}) {
	const { children, className, color: collection } = props
	const { borderClassName, invertedClassName } = getSectionDisplayData(collection)

	const classes = cn(
		'border-b border-b-2 text-2xl font-medium',
		invertedClassName,
		borderClassName,
		className,
	)

	return <h2 className={classes}>{children}</h2>
}
