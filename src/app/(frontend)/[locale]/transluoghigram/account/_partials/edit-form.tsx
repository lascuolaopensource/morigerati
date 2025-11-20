import { PencilIcon } from 'lucide-react'

import { Button } from '@/modules/components/shadcn/components/ui/button'
import { Input } from '@/modules/components/shadcn/components/ui/input'
import { Label } from '@/modules/components/shadcn/components/ui/label'
import { Textarea } from '@/modules/components/shadcn/components/ui/textarea'
import { SocialPost } from '@/payload-types'

import { FieldWrapper } from '../../_forms/base-form'
import { SheetForm } from '../../_forms/sheet-form'
import { getKeys } from '../../_forms/types'
import { editPost, EditPostData } from './edit.action'

//

type Props = {
	post: SocialPost
}

export function EditPostForm({ post }: Props) {
	const key = getKeys<EditPostData>()

	return (
		<SheetForm
			sheetTrigger={
				<Button variant="outline" size="icon">
					<PencilIcon className="size-4" />
				</Button>
			}
			action={editPost}
			sheetTitle="Modifica post"
			submitButton="Modifica post"
		>
			<div className="flex flex-col gap-6">
				<FieldWrapper>
					<Label htmlFor={key('text')}>Testo</Label>
					<Textarea
						name={key('text')}
						className="min-h-[200px]"
						defaultValue={post.text ?? undefined}
					/>
				</FieldWrapper>

				<FieldWrapper>
					<Label htmlFor={key('link')}>Link</Label>
					<Input name={key('link')} type="url" defaultValue={post.link ?? undefined} />
				</FieldWrapper>

				<input type="hidden" name={key('id')} value={post.id} />
			</div>
		</SheetForm>
	)
}
