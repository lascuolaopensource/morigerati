'use client'
import React from 'react'
import { Link } from '@/i18n/routing'
import { Residenze } from '@/payload-types'
import { useParams } from 'next/navigation'
import formatDate from '@/utils/formatDate'

interface ResidenzeListProps {
  items: Residenze[]
}

const ResidenzeList: React.FC<ResidenzeListProps> = ({ items }) => {
  const params = useParams()
  const locale = (params?.locale as string) || 'it'

  if (!items?.length) return null

  return (
    <div className="space-y-1 w-full">
      {items.map((item) => {
        // Handle localized fields
        const title =
          typeof item.nome === 'object' && item.nome !== null
            ? item.nome[locale] || Object.values(item.nome)[0] || ''
            : item.nome || ''

        let slug = item.slug
        if (typeof slug === 'object' && slug !== null) {
          slug = slug[locale] || Object.values(slug)[0] || ''
        }

        // Get dates
        const startDate = item.data_inizio
          ? formatDate(item.data_inizio, 'Data non disponibile', true, locale)
          : null

        const endDate = item.data_fine
          ? formatDate(item.data_fine, 'Data non disponibile', true, locale)
          : null

        return (
          <Link key={item.id} href={`/${locale}/residenze/${slug}`}>
            <div className="flex justify-between items-center border-b border-gray-100 py-3 px-1 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{title}</h3>
              </div>

              <div className="hidden sm:block text-sm text-gray-500 whitespace-nowrap ml-4">
                {startDate && endDate ? (
                  <span>
                    {startDate} - {endDate}
                  </span>
                ) : startDate ? (
                  <span>{startDate}</span>
                ) : (
                  <span className="italic">Data da definire</span>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ResidenzeList
