import { Link } from '#/i18n'
import { LinkProps } from '#/utils'
import { cn } from '$/lib/utils'
import { ArrowLeft } from 'lucide-react'

//

export function BackButton(props: LinkProps) {
	const { children, className, ...rest } = props
	const classes = cn('hover:underline font-bold flex items-center gap-1', className)

	return (
		<Link {...rest} className={classes} aria-label="back button">
			<ArrowLeft size={16} />
			{children}
		</Link>
	)
}
