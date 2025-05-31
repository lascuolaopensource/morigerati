import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import PixelBorder from '../uiElements/pixelBorder'
import { getColorTheme } from '@/utils/colors'
import { MainCollections } from '@/utils/types'

//

interface CollectionHeadingProps {
  collection: MainCollections
  title?: string
  introContent?: SerializedEditorState | null
  pixelBorder?: boolean
}

export function CollectionHeading(props: CollectionHeadingProps) {
  const { collection, title, introContent, pixelBorder = true } = props
  const { text, bg } = getColorTheme(collection)

  return (
    <>
      {pixelBorder && <PixelBorder className={bg} />}

      <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-8 pt-10 text-center max-w-screen-xl mx-auto">
        {title && (
          <h1 className={`text-3xl md:text-4xl font-bold text-balance  ${text}`}>{title}</h1>
        )}
        {introContent && (
          <RichText data={introContent} className="prose md:prose-lg text-balance" />
        )}
      </div>
    </>
  )
}
