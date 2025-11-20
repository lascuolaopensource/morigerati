'use server'

import config from '@payload-config'
import { login } from '@payloadcms/next/auth'
import { getLocale } from 'next-intl/server'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { redirect } from '@/modules/i18n'

import { FormAction } from '../_forms/types'

//

export const signup: FormAction = async (_, formData) => {
	const validatedFields = schema.safeParse(formData)
	if (!validatedFields.success) return { type: 'error', message: 'Dati non validi' }

	const { email, password } = validatedFields.data

	try {
		await login({
			collection: 'social-account',
			config,
			email,
			password,
		})
	} catch (e) {
		console.error(e)
		return { type: 'error', message: 'Failed to signup' }
	}

	redirect({
		href: `/transluoghigram/account`,
		locale: await getLocale(),
	})

	return { type: 'success' }
}

const schema = zfd.formData({
	email: zfd.text(z.email()),
	password: zfd.text(z.string().min(8).max(100)),
})

export type LoginData = z.infer<typeof schema>
