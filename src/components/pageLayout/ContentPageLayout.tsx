import React from 'react'
import Copertina from '@/components/uiElements/copertina'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Galleria from '@/components/galleria/galleria'
import PixelBorder from '../uiElements/pixelBorder'
import { getRandomColor } from '@/utils/colors'

//

interface ContentPageLayoutProps {
  coverImage?: string | Media | null
  richTextContent?: SerializedEditorState | null
  galleryItems?: (string | Media)[] | null
}

export default function ContentPageLayout({
  coverImage,
  richTextContent,
  galleryItems,
}: ContentPageLayoutProps) {
  const mediaItems = galleryItems ? galleryItems.filter(isMediaItem) : []
  const { text, bg, border } = getRandomColor()

  return (
    <>
      {coverImage && isMediaItem(coverImage) && <Copertina copertina={coverImage} />}

      <PixelBorder className={`w-full ${bg}`} />

      <div className="max-w-screen-xl mx-auto grow p-4 md:p-8 !py-10">
        {richTextContent && (
          <div>
            <RichText data={richTextContent} className="prose md:prose-lg mx-auto" />
          </div>
        )}
      </div>

      <PixelBorder className={`w-full ${bg}`} />

      {mediaItems.length > 0 && (
        <div className={bg}>
          <div className={`max-w-screen-xl mx-auto p-4 md:p-8 `}>
            <Galleria items={mediaItems} />
          </div>
        </div>
      )}
    </>
  )
}

//

function isMediaItem(item: any): item is Media {
  return typeof item !== 'string' && item !== null && item !== undefined
}
