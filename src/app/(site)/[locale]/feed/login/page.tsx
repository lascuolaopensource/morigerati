'use client'

import { signup } from './auth'
import { useActionState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

//

export default function LoginPage() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="flex flex-col gap-6 w-full">
      <FieldWrapper>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </FieldWrapper>

      {state?.error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{state.error}</AlertTitle>
        </Alert>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? 'Attendi...' : 'Login'}
      </Button>
    </form>
  )
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full space-y-2">{children}</div>
}
