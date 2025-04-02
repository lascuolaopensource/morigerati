import React, { ReactNode } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RandomLetter } from '@/components/home/randomLetter'
import CardGrid from '@/components/card/cardsGrid'
import { CategoryType } from '@/components/card/types'

interface ArchivePageLayoutProps {
  /**
   * Page title
   */
  title?: string

  /**
   * Rich text introduction content
   */
  introContent?: SerializedEditorState | null

  /**
   * Children elements (typically custom content when not using the grid layout)
   */
  children?: ReactNode

  /**
   * Optional additional class names
   */
  className?: string

  /**
   * When using the built-in card grid layout
   */
  cardGridOptions?: {
    items: any[]
    category: CategoryType
    singleRow?: boolean
  }

  /**
   * Color theme for the random letter decoration
   */
  colorTheme?: CategoryType | 'articoli'
}

/**
 * A component that renders a standard layout for archive/listing pages
 * with a title, introduction text, and a grid/list of items
 */
export default function ArchivePageLayout({
  title,
  introContent,
  children,
  className = '',
  cardGridOptions,
  colorTheme,
}: ArchivePageLayoutProps) {
  return (
    <main className={`max-w-screen-xl mx-auto relative w-screen py-8 ${className}`}>
      {title && (
        <div className="font-normal text-sm leading-4">
          <h1 className="font-bold text-center text-[40px]">{title}</h1>
        </div>
      )}

      {introContent && (
        <div className="flex items-center justify-center">
          <RichText data={introContent} className="prose prose-lg pl-6 pr-6" />
        </div>
      )}

      {/* Card grid if options are provided */}
      {cardGridOptions && (
        <CardGrid
          items={cardGridOptions.items}
          category={cardGridOptions.category}
          singleRow={cardGridOptions.singleRow}
          className="mt-6"
        />
      )}

      {/* Custom content */}
      {!cardGridOptions && children && <div className="flex flex-wrap -mx-2">{children}</div>}

      {/* Decorative element */}
      {colorTheme && <RandomLetter color={colorTheme} position={'left'} />}
    </main>
  )
}
