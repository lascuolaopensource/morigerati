'use client'

import { Button } from '$/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '$/components/ui/dropdown-menu'
import { cn } from '$/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'

import { localization } from './localization'
import { usePathname, useRouter } from './navigation'
import { Locale } from './types'

export function LocaleSwitcher() {
	const pathname = usePathname()
	const router = useRouter()
	const currentLocale = useLocale()

	function handleChangeLocale(locale: Locale) {
		router.replace({ pathname }, { locale: locale })
	}

	const currentLocaleLabel = localization.locales.find((l) => l.code === currentLocale)?.label

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Button variant="ghost" className="hover:ring-black hover:ring-2 flex items-center gap-1">
					<span className="translate-y-0.5">{currentLocaleLabel}</span>
					<ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				<DropdownMenuGroup className="space-y-0.5">
					{localization.locales.map((l) => (
						<DropdownMenuItem
							key={l.code}
							className={cn('cursor-pointer justify-center', {
								'bg-blue-100 hover:bg-blue-100!': currentLocale === l.code,
							})}
							onClick={() => handleChangeLocale(l.code)}
						>
							{l.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
