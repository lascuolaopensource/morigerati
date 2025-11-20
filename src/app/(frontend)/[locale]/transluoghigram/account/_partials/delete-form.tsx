import { AlertCircleIcon, TrashIcon } from 'lucide-react'

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/modules/components/shadcn/components/ui/alert'
import { Button } from '@/modules/components/shadcn/components/ui/button'
import { getRelation } from '@/modules/utils'
import { SocialPost } from '@/payload-types'

import { SheetForm } from '../../_forms/sheet-form'
import { getKeys } from '../../_forms/types'
import { Post } from '../../_partials/post'
import { deletePost, DeletePostData } from './delete.action'

//

type DeletePostProps = {
	post: SocialPost
}

export function DeletePostForm({ post }: DeletePostProps) {
	const key = getKeys<DeletePostData>()

	return (
		<SheetForm
			sheetTrigger={
				<Button variant="outline" size="icon">
					<TrashIcon className="size-4" />
				</Button>
			}
			action={deletePost}
			sheetTitle="Elimina post"
			submitButton="Elimina post"
		>
			<div className="flex flex-col gap-6">
				<input type="hidden" name={key('id')} value={post.id} />

				<Post post={post} owner={getRelation(post.owner)?.name ?? 'TR'} />

				<Alert variant="destructive">
					<AlertCircleIcon size={16} />
					<AlertTitle>Attenzione!</AlertTitle>
					<AlertDescription>Sei sicuro di voler eliminare questo post?</AlertDescription>
				</Alert>
			</div>
		</SheetForm>
	)
}
