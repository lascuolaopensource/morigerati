export type FormState = { type: 'error'; message: string } | { type: 'success' } | undefined

export type FormAction = (state: FormState, formData: FormData) => Promise<FormState>

export function getKeys<T extends object>() {
	return function <K extends keyof T>(key: K): K {
		return key
	}
}
