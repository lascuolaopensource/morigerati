import React, { ReactNode } from 'react'
import Copertina from '@/components/uiElements/copertina'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Galleria from '@/components/galleria/galleria'
import PixelBorder from '../uiElements/pixelBorder'

interface ContentPageLayoutProps {
  coverImage?: string | Media | null
  richTextContent?: SerializedEditorState | null
  galleryItems?: (string | Media)[] | null
  children?: ReactNode
  className?: string
}

/**
 * Type guard for Media objects
 */
function isMediaItem(item: any): item is Media {
  return typeof item !== 'string' && item !== null && item !== undefined
}

/**
 * A component that renders a standard layout for content-focused pages
 * with consistent structure for cover image, rich text content, and gallery
 */
export default function ContentPageLayout({
  coverImage,
  richTextContent,
  galleryItems,
  children,
  className = '',
}: ContentPageLayoutProps) {
  // Filter gallery items to ensure they're valid Media objects
  const mediaItems = galleryItems ? galleryItems.filter(isMediaItem).filter(Boolean) : []

  return (
    <main className={`max-w-screen-xl mx-auto pb-10 ${className}`}>
      {coverImage && isMediaItem(coverImage) && <Copertina copertina={coverImage} />}

      <PixelBorder color="black" className="w-full" />

      <div className="p-4 md:p-8 !py-10">
        {richTextContent && (
          <div>
            <RichText data={richTextContent} className="prose md:prose-lg mx-auto" />
          </div>
        )}

        {children}

        {mediaItems.length > 0 && (
          <div>
            <Galleria items={mediaItems} showTitle={false} />
          </div>
        )}
      </div>
    </main>
  )
}
