'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '$/components/ui/sheet'
import { useState } from 'react'

import { BaseForm, BaseFormProps } from './base-form'

//

type Props = BaseFormProps & {
	sheetTitle: string
	sheetTrigger: React.ReactNode
}

export function SheetForm(props: Props) {
	const { sheetTitle, sheetTrigger, ...rest } = props
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{sheetTrigger}</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>{sheetTitle}</SheetTitle>
				</SheetHeader>

				<div className="p-6">
					<BaseForm {...rest} onSuccess={() => setOpen(false)} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
