import { cn } from '$/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import localFont from 'next/font/local'

import './styles.css'

import { notFound } from 'next/navigation'
import React from 'react'

import { Navbar } from '@/modules/components/navbar'
import { hasLocale } from '@/modules/i18n'

//

// export const metadata = {
//   description: 'A blank template using Payload in a Next.js app.',
//   title: 'Payload Blank Template',
// }

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
			<body>
				<NextIntlClientProvider>
					<Navbar />
					<main>{children}</main>
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
