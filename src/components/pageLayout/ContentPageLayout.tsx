import React, { ReactNode } from 'react'
import { RandomPixel } from '@/components/uiElements/pixels'
import Copertina from '@/components/uiElements/copertina'
import { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Galleria from '@/components/galleria/galleria'

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
    <main className={`max-w-screen-xl mx-auto pb-4 ${className}`}>
      {/* Cover image */}
      {coverImage && isMediaItem(coverImage) && <Copertina copertina={coverImage} />}

      <div className="relative p-3 pt-5 max-w-screen-xl mx-auto">
        {/* Rich text content */}
        {richTextContent && <RichText data={richTextContent} className="prose prose-lg" />}

        {/* Custom children content */}
        {children}

        {/* Gallery */}
        {mediaItems.length > 0 && (
          <div className="p-4">
            <Galleria items={mediaItems} />
          </div>
        )}
      </div>
    </main>
  )
}
