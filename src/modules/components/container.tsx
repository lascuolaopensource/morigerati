import { cn } from '$/lib/utils'
import { ClassValue } from 'clsx'

type Props = {
	children?: React.ReactNode
	className?: ClassValue
}

export function Container(props: Props) {
	const { children, className } = props
	const classes = cn('max-w-screen-xl mx-auto p-4 md:p-8 py-10 w-full', className)
	return <div className={classes}>{children}</div>
}
