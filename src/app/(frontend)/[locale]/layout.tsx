import { cn } from '$/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import localFont from 'next/font/local'

import './styles.css'

import { notFound } from 'next/navigation'
import React from 'react'

import { Footer } from '@/modules/components/footer'
import { Navbar } from '@/modules/components/navbar'
import { hasLocale } from '@/modules/i18n'

//

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export default async function RootLayout(props: Props) {
	const { children, params } = props

	const { locale } = await params
	if (!hasLocale(locale)) notFound()

	return (
		<html lang="en" className={cn(transluoghiPixelsFont.variable, transinstrumentFont.variable)}>
			<body className="min-h-screen flex flex-col">
				<NextIntlClientProvider>
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

const transluoghiPixelsFont = localFont({
	src: './_fonts/transluoghi-pixels.ttf',
	variable: '--font-transluoghi-pixels',
})

const transinstrumentFont = localFont({
	src: './_fonts/transinstrument-sans-vf.ttf',
	variable: '--font-transinstrument',
})
