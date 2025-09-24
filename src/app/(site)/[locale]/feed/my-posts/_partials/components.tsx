'use client'

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '#/components/ui/sheet'
import { AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '#/components/ui/utils'

//

type SheetFormProps = BaseFormProps & {
  sheetTitle: string
  sheetTrigger: React.ReactNode
}

export function SheetForm(props: SheetFormProps) {
  const { children, onSuccess, sheetTitle, sheetTrigger, ...rest } = props
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{sheetTrigger}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
        </SheetHeader>

        <BaseForm
          onSuccess={() => {
            setOpen(false)
            onSuccess()
          }}
          {...rest}
        >
          {children}
        </BaseForm>
      </SheetContent>
    </Sheet>
  )
}

//

type BaseFormProps = {
  children?: React.ReactNode
  onSubmit: (formData: FormData) => Promise<Error | undefined>
  onSuccess: () => void
  submitButtonText: string
  className?: string
}

function BaseForm(props: BaseFormProps) {
  const { children, onSubmit, onSuccess, submitButtonText, className } = props

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const err = await onSubmit(formData)
        setLoading(false)
        if (err) setError(err.message)
        else onSuccess()
      }}
      className={cn('flex flex-col gap-6 w-full', className)}
    >
      {children}

      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon size={16} />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Attendi...' : submitButtonText}
      </Button>
    </form>
  )
}

export function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full space-y-2">{children}</div>
}
