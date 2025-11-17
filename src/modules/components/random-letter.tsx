import { ClassValue } from 'clsx'

import { getSectionDisplayData, MainCollection } from '../brand'
import { cn } from './shadcn/lib/utils'

//

interface Props {
	collection?: MainCollection
	className?: ClassValue
	size?: number
}

export function RandomLetter(props: Props) {
	const { collection, className, size = 96 } = props

	const letter = generateRandomLetter()
	const { invertedClassName } = getSectionDisplayData(collection)

	const classes = cn(
		'font-transluoghi-pixels block select-none text-center',
		invertedClassName,
		className,
	)

	return (
		<p style={{ fontSize: `${size}px`, lineHeight: `${size}px` }} className={classes}>
			{letter}
		</p>
	)
}

//

function generateRandomLetter(): string {
	const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
	return Math.random() > 0.5 ? letter.toLowerCase() : letter
}
