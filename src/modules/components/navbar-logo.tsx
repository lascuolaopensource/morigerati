'use client'

import { Link } from '#/i18n'
import { useState } from 'react'

//

export function NavbarLogo() {
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
				className="w-[250px] text-black"
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
						className="text-[85px] font-transluoghi-pixels"
						clipPath="url(#logo-letters-clip)"
					>
						{letters}
					</text>

					<text className="font-semibold text-[25px]" x="275" y="30">
						Transluoghi
					</text>
					<text className="text-[25px]" x="550" y="60" textAnchor="end">
						Ecomuseo del Bussento
					</text>
					<text className="text-[25px]" x="550" y="90" textAnchor="end">
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
