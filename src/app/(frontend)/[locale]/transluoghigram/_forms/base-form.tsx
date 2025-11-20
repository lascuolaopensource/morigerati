'use client'

import { Alert, AlertTitle } from '$/components/ui/alert'
import { Button } from '$/components/ui/button'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

import { FormAction } from './types'

//

export type BaseFormProps = {
	action: FormAction
	children?: React.ReactNode
	submitButton: React.ReactNode
	onSuccess?: () => void
	preventRefreshOnSuccess?: boolean
}

export function BaseForm(props: BaseFormProps) {
	const {
		action: actionFn,
		children,
		submitButton,
		onSuccess,
		preventRefreshOnSuccess = false,
	} = props

	const [state, action, pending] = useActionState(actionFn, undefined)
	const router = useRouter()

	useEffect(() => {
		if (state?.type === 'success') {
			onSuccess?.()
			if (!preventRefreshOnSuccess) router.refresh()
		}
	}, [state, onSuccess, preventRefreshOnSuccess, router])

	return (
		<form action={action} className="flex flex-col gap-6 w-full">
			{children}

			{state?.type === 'error' && (
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>{state.message}</AlertTitle>
				</Alert>
			)}

			<Button type="submit" disabled={pending}>
				{pending && <Loader2Icon className="size-4 animate-spin" />}
				{submitButton}
			</Button>
		</form>
	)
}

//

export function FieldWrapper({ children }: { children: React.ReactNode }) {
	return <div className="w-full space-y-2">{children}</div>
}
