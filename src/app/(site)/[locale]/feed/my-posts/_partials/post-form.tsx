'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { FieldWrapper, SheetForm } from './components'
import {
  handleCreatePost,
  handleDeletePost,
  handleUpdatePost,
  mimeTypes,
  Post,
} from './post-form-handling'

//

type PostFormProps = {
  apiUrl: string
  postId?: string
  initialValues?: Partial<Omit<Post, 'media'>>
  sheetTrigger: React.ReactNode
}

export function PostForm({ apiUrl, postId, initialValues, sheetTrigger }: PostFormProps) {
  const router = useRouter()

  return (
    <SheetForm
      sheetTrigger={sheetTrigger}
      onSubmit={(formData) => {
        if (postId) return handleUpdatePost(formData, apiUrl, postId)
        else return handleCreatePost(formData, apiUrl)
      }}
      onSuccess={() => {
        router.refresh()
      }}
      sheetTitle={postId ? 'Modifica post' : 'Crea post'}
      submitButtonText={postId ? 'Salva modifiche' : 'Crea post'}
      className="flex flex-col gap-6 max-w-md w-full mx-auto pt-8"
    >
      <FieldWrapper>
        <Label htmlFor="text">
          Testo <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="text"
          name="text"
          className="min-h-[200px]"
          defaultValue={initialValues?.text}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="link">Link</Label>
        <Input id="link" name="link" type="url" defaultValue={initialValues?.link ?? undefined} />
      </FieldWrapper>

      {!postId && (
        <FieldWrapper>
          <Label htmlFor="media">Media</Label>
          <Input id="media" name="media" type="file" accept={mimeTypes.join(',')} />
        </FieldWrapper>
      )}
    </SheetForm>
  )
}

//

type DeletePostProps = {
  apiUrl: string
  postId: string
  sheetTrigger: React.ReactNode
  children?: React.ReactNode
}

export function DeletePost({ apiUrl, postId, sheetTrigger, children }: DeletePostProps) {
  const router = useRouter()

  return (
    <SheetForm
      sheetTrigger={sheetTrigger}
      onSubmit={() => handleDeletePost(apiUrl, postId)}
      onSuccess={() => {
        router.refresh()
      }}
      sheetTitle="Elimina post"
      submitButtonText="Elimina post"
      className="pt-8"
    >
      {children}
    </SheetForm>
  )
}
