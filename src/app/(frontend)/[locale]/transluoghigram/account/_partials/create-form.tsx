import { PlusIcon } from 'lucide-react'

import { SocialMedia } from '@/db/collections/transluoghigram/social-media'
import { Button } from '@/modules/components/shadcn/components/ui/button'
import { Input } from '@/modules/components/shadcn/components/ui/input'
import { Label } from '@/modules/components/shadcn/components/ui/label'
import { Textarea } from '@/modules/components/shadcn/components/ui/textarea'

import { FieldWrapper } from '../../_forms/base-form'
import { SheetForm } from '../../_forms/sheet-form'
import { getKeys } from '../../_forms/types'
import { createPost, CreatePostData } from './create.action'

//

export function CreatePostForm() {
	const key = getKeys<CreatePostData>()
	const mimeTypes = SocialMedia.upload.mimeTypes

	return (
		<SheetForm
			sheetTrigger={
				<Button>
					<PlusIcon className="size-4" />
					<span>Crea post</span>
				</Button>
			}
			action={createPost}
			sheetTitle="Crea post"
			submitButton="Crea post"
		>
			<div className="flex flex-col gap-6">
				<FieldWrapper>
					<Label htmlFor={key('text')}>
						Testo <span className="text-red-500">*</span>
					</Label>
					<Textarea name={key('text')} className="min-h-[200px]" />
				</FieldWrapper>

				<FieldWrapper>
					<Label htmlFor={key('link')}>Link</Label>
					<Input name={key('link')} type="url" />
				</FieldWrapper>

				<FieldWrapper>
					<Label htmlFor={key('media')}>Media</Label>
					<Input name={key('media')} type="file" accept={mimeTypes.join(',')} />
				</FieldWrapper>
			</div>
		</SheetForm>
	)
}
