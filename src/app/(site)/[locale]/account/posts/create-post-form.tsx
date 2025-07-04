'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
// import { AlertCircleIcon } from 'lucide-react'

import { handleCreatePost } from './form-handling'

//

export function CreatePostForm({ apiUrl }: { apiUrl: string }) {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crea un post</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={(e) => handleCreatePost(e, apiUrl)}
          className="flex flex-col gap-6 max-w-md w-full mx-auto p-4"
        >
          <FieldWrapper>
            <Label htmlFor="text">Testo</Label>
            <Textarea id="text" name="text" className="min-h-[200px]" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="link">Link</Label>
            <Input id="link" name="link" type="url" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="media">Media</Label>
            <Input id="media" name="media" type="file" />
          </FieldWrapper>

          {/* {state?.error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{state.error}</AlertTitle>
            </Alert>
          )} */}

          <Button type="submit">Crea post</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

//

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full space-y-2">{children}</div>
}
