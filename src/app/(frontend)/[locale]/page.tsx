import { getTranslations } from 'next-intl/server'

import { LocaleSwitcher } from '@/modules/i18n'

import './styles.css'

export default async function HomePage() {
	// const headers = await getHeaders()
	// const payloadConfig = await config
	// const payload = await getPayload({ config: payloadConfig })
	const t = await getTranslations()

	return (
		<div className="home">
			<h1>{t('buttons.allPlaces')}</h1>
			<LocaleSwitcher />
		</div>
	)
}
