'use client'

import { Input } from '$/components/ui/input'
import { Label } from '$/components/ui/label'

import { T } from '@/modules/components/t'

import { BaseForm, FieldWrapper } from '../_forms/base-form'
import { getKeys } from '../_forms/types'
import { LoginData, signup } from './auth'

//

export default function LoginPage() {
	const key = getKeys<LoginData>()
	return (
		<BaseForm action={signup} submitButton="Login">
			<T tag="h1">Transluoghigram</T>

			<FieldWrapper>
				<Label htmlFor={key('email')}>Email</Label>
				<Input id={key('email')} name={key('email')} type="email" />
			</FieldWrapper>

			<FieldWrapper>
				<Label htmlFor={key('password')}>Password</Label>
				<Input id={key('password')} name={key('password')} type="password" />
			</FieldWrapper>
		</BaseForm>
	)
}
