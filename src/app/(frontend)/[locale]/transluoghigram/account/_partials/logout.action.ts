'use server'

import config from '@payload-config'
import { logout as payloadLogout } from '@payloadcms/next/auth'
import { getLocale } from 'next-intl/server'

import { redirect } from '@/modules/i18n'

//

export async function logout(_: FormData) {
	await payloadLogout({ config })
	redirect({
		href: `/transluoghigram/login`,
		locale: await getLocale(),
	})
}
