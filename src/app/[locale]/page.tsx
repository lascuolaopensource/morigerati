import { getTranslations } from 'next-intl/server'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import './styles.css'
import config from '@/payload.config'

export default async function HomePage() {
	// const headers = await getHeaders()
	// const payloadConfig = await config
	// const payload = await getPayload({ config: payloadConfig })
	const t = await getTranslations()

	return (
		<div className="home">
			<h1>{t('buttons.allPlaces')}</h1>
		</div>
	)
}
