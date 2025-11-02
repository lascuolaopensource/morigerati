import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import React from 'react'

import './styles.css'

import { Navbar } from '@/modules/components/navbar'
import { hasLocale } from '@/modules/i18n'

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
		<html lang="en">
			<body>
				<NextIntlClientProvider>
					<Navbar />
					<main>{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
