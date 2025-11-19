'use client'

import { Link } from '#/i18n'
import { useState } from 'react'

import { cn } from './shadcn/lib/utils'

//

type Props = {
	className?: string
	textClassName?: string
}

export function Logo(props: Props) {
	const { className, textClassName } = props

	const [letters, setLetters] = useState('xA')
	const [logoInterval, setLogoInterval] = useState<NodeJS.Timeout>()

	function startInterval() {
		const intv = setInterval(() => {
			setLetters(getRandomLetters())
		}, 100)
		setLogoInterval(intv)
	}

	function stopInterval() {
		if (logoInterval) {
			clearInterval(logoInterval)
			setLogoInterval(undefined)
		}
	}

	return (
		<Link href="/" className="block">
			<div
				className={cn('w-[250px]', className)}
				onMouseEnter={startInterval}
				onMouseLeave={stopInterval}
			>
				<svg viewBox="0 0 550 95" className="w-full" preserveAspectRatio="xMinYMid meet">
					<defs>
						<clipPath id="logo-letters-clip">
							<rect width="260" height="90" />
						</clipPath>
					</defs>
					<text
						y="90"
						className={cn('text-[85px] font-transluoghi-pixels', textClassName)}
						clipPath="url(#logo-letters-clip)"
					>
						{letters}
					</text>

					<text className={cn('font-semibold text-[25px]', textClassName)} x="275" y="30">
						Transluoghi
					</text>
					<text className={cn('text-[25px]', textClassName)} x="550" y="60" textAnchor="end">
						Ecomuseo del Bussento
					</text>
					<text className={cn('text-[25px]', textClassName)} x="550" y="90" textAnchor="end">
						Contemporaneo
					</text>
				</svg>
			</div>
		</Link>
	)
}

function getRandomLetters(count = 4) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return Array.from(
		{ length: count },
		() => alphabet[Math.floor(Math.random() * alphabet.length)],
	).join('')
}
