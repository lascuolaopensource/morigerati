//Boilerplate
import React from 'react'
import Image from 'next/image'
//Locale
import { Link } from '@/modules/i18n/routing'
//Components
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/modules/components/ui/card'
import { Badge } from '@/modules/components/ui/badge'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    subtitle: string
    slug: string
    imageUrl: any
    tags: string[]
    date: string
  }
  isMobile: boolean
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, isMobile }) => {
  const { id, title, subtitle, slug, imageUrl, tags, date } = article

  return (
    <Card key={id} className="overflow-hidden max-w-full">
      <Link href={`/articoli/${slug}`} className="group block h-full">
        <div className="flex flex-col md:flex-row h-full">
          {/* Article Image */}
          <div className="relative w-full h-52 md:h-auto md:w-48 md:min-h-[8rem] flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              quality={80}
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Article Content */}
          <div className="flex-1 flex flex-col h-full">
            <CardHeader className="pb-2 overflow-hidden flex-1">
              <CardTitle className="group-hover:text-articoliColor transition-colors line-clamp-3 break-words hyphens-auto">
                {title}
              </CardTitle>
              {subtitle && (
                <CardDescription className="mt-1 line-clamp-2 break-words hyphens-auto">
                  {subtitle}
                </CardDescription>
              )}
            </CardHeader>

            <CardFooter className="py-2 flex flex-wrap items-center gap-2 text-xs text-gray-600 overflow-hidden">
              {date && (
                <span className="font-serif italic max-w-[100px] md:max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {date}
                </span>
              )}

              {tags && tags.length > 0 && (
                <>
                  <span className="text-gray-400 mx-1 flex-shrink-0">|</span>
                  <div className="flex-1 flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-1 pr-1">
                    {/* Show fewer tags on mobile */}
                    {tags.slice(0, isMobile ? 1 : 3).map((tag, idx) => (
                      <Badge
                        key={idx}
                        className="border font-normal flex-shrink-0 max-w-[100px] md:max-w-[120px] overflow-hidden"
                      >
                        <span className="truncate block w-full">{tag}</span>
                      </Badge>
                    ))}

                    {/* Show count of additional tags if there are more */}
                    {isMobile && tags.length > 1 && (
                      <Badge className="border font-normal flex-shrink-0 bg-gray-50 text-gray-500">
                        +{tags.length - 1}
                      </Badge>
                    )}

                    {!isMobile && tags.length > 3 && (
                      <Badge className="border font-normal flex-shrink-0 bg-gray-50 text-gray-500">
                        +{tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </CardFooter>
          </div>
        </div>
      </Link>
    </Card>
  )
}
