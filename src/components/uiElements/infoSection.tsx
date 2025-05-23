import { MainCollections } from '@/utils/types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { T } from './t'
import { cn } from '@/lib/utils'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getColorTheme } from '@/utils/colors'

export function InfoSection(props: {
  children?: React.ReactNode
  title: string
  text?: SerializedEditorState
  className?: string
  collection: MainCollections
}) {
  const { children, title, text, className, collection } = props
  const { border } = getColorTheme(collection)

  return (
    <div className={cn('space-y-4', className)}>
      <T tag="h2" className={`border-b ${border}`}>
        {title}
      </T>

      {text && <RichText data={text} className="prose-sm" />}

      {Boolean(children) && children}
    </div>
  )
}
