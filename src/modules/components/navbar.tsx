'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { getSectionDisplayData, pathnameToSection } from '#/brand'
import { Link, LocaleSwitcher, usePathname } from '#/i18n'
import { LinkProps } from '#/utils'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '$/components/ui/sheet'
import { cn } from '$/lib/utils'
import { ClassValue } from 'clsx'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import NavbarLogo from './navbar-logo'

//

export function Navbar() {
	const pathname = usePathname()
	const t = useTranslations()

	const links: LinkProps[] = [
		{
			href: '/about',
			title: t('navigation.about'),
		},
		{
			href: '/mobilita-sostenibile',
			title: t('navigation.mobility'),
		},
		{
			href: '/itinerari',
			title: t('navigation.itineraries'),
		},
		{
			href: '/luoghi',
			title: t('navigation.places'),
		},
		{
			href: '/residenze',
			title: t('navigation.residences'),
		},
		{
			href: '/persone',
			title: t('navigation.persone'),
		},
		{
			href: '/articoli',
			title: t('navigation.articles'),
		},
	]

	const classes = getSectionDisplayData(pathnameToSection(pathname))

	return (
		<nav className={cn('z-50 transition-all', classes.className)} role="navigation">
			<div className="flex justify-between items-center max-w-7xl py-1 px-3">
				<NavbarLogo />

				<div className="flex items-center gap-2">
					<LocaleSwitcher />

					<div className="hidden lg:flex items-center gap-0">
						{links.map((link) => (
							<NavbarLink key={link.title} {...link} />
						))}
					</div>

					<NavbarMenu links={links} className={classes.className} />
				</div>
			</div>
		</nav>
	)
}

//

type NavbarMenuProps = {
	links: LinkProps[]
	className?: ClassValue
}

function NavbarMenu(props: NavbarMenuProps) {
	const { links, className } = props
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className="lg:hidden p-2 rounded-lg hover:cursor-pointer hover:ring-black hover:ring-2">
				<MenuIcon />
			</SheetTrigger>

			<SheetContent
				side="top"
				className={cn(
					'h-screen border-b-black transition-colors [&_button]:cursor-pointer',
					'[&_button]:hover:ring-black [&_button]:hover:ring-2 [&_button]:p-2',
					'[&_button]:rounded-lg [&_button]:text-black',
					className,
				)}
				aria-describedby={undefined}
			>
				<VisuallyHidden>
					<SheetTitle>{t('common.menu')}</SheetTitle>
				</VisuallyHidden>

				<div className="flex flex-col gap-2 mx-auto pt-12">
					{links.map((link) => (
						<NavbarLink
							key={link.title}
							{...link}
							className="text-center text-lg"
							onClick={() => {
								setIsOpen(false)
							}}
						/>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}

function NavbarLink(props: LinkProps) {
	const { href, title, className, children, ...rest } = props
	return (
		<Link
			href={href}
			className={cn('p-2 rounded-lg hover:cursor-pointer hover:ring-black hover:ring-2', className)}
			{...rest}
		>
			{children || title}
		</Link>
	)
}
