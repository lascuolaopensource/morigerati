'use server'

import { z } from 'zod'
import { login } from '@payloadcms/next/auth'
import config from '@payload-config'

import { redirect } from 'next/navigation'
import { getLocale } from '@/modules/i18n'

type FormState = {
  error?: string
}

export async function signup(
  _: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  const { email, password } = validatedFields.data

  try {
    await login({
      collection: 'account',
      config,
      email,
      password,
    })
  } catch (e) {
    console.error(e)
    return {
      error: 'Failed to signup',
    }
  }

  const locale = await getLocale()
  redirect(`/${locale}/feed/my-posts`)
}

const schema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
})
