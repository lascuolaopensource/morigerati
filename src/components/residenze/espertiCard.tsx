'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaURL } from '@/utils/getMediaUrl'
import { Residenze } from '@/payload-types'

type Esperto = NonNullable<Residenze['esperti']>[number]

const TutorCard: React.FC<{ esperto: Esperto }> = ({ esperto }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const splitArray = <T extends unknown>(arr: T[] | null | undefined): [T[], T[]] => {
    if (!arr) return [[], []]
    const midpoint = Math.ceil(arr.length / 2)
    return [arr.slice(0, midpoint), arr.slice(midpoint)]
  }

  const [leftProjects, rightProjects] = splitArray(esperto.progetti)
  const [leftOrganizations, rightOrganizations] = splitArray(esperto.organizzazioni)

  const renderColumn = (items: typeof leftProjects) => (
    <div className="w-1/2 pr-1">
      {items.map((item, index) => (
        <div key={index} className="text-sm truncate underline">
          <Link href={item.link}>{item.nome}</Link>
        </div>
      ))}
    </div>
  )

  const hasProjectsOrOrganizations =
    leftProjects.length > 0 ||
    rightProjects.length > 0 ||
    leftOrganizations.length > 0 ||
    rightOrganizations.length > 0

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <div className="w-full border-2 border-black rounded-lg flex flex-col">
      <div
        className={`flex flex-1 ${hasProjectsOrOrganizations ? 'border-b-2' : ''} border-black ${!esperto.foto ? 'flex-col' : ''}`}
      >
        {esperto.foto && (
          <div className="w-40 h-full min-h-36 relative">
            <Image
              src={getMediaURL(esperto.foto) || '/placeholder-image.jpg'}
              alt={esperto.nome || 'Tutor'}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className={`${esperto.foto ? 'w-2/3' : 'w-full'} h-full flex flex-col p-2`}>
          <h3 className="font-medium">{esperto.nome}</h3>
          <div className="flex-grow overflow-hidden">
            <p className="text-xs leading-normal">
              {isExpanded ? esperto.biografia : truncateText(esperto.biografia || '', 300)}
            </p>
            {esperto.biografia && esperto.biografia.length > 300 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-black font-medium underline mt-1"
              >
                {isExpanded ? 'Comprimi' : 'Espandi'}
              </button>
            )}
          </div>
        </div>
      </div>
      {hasProjectsOrOrganizations && (
        <div className={`flex-1 flex flex-col p-2 ${!hasProjectsOrOrganizations ? 'h-0' : ''}`}>
          {leftProjects.length > 0 || rightProjects.length > 0 ? (
            <div className="mb-2">
              <h3 className="font-medium mb-1">Progetti</h3>
              <div className="flex">
                {renderColumn(leftProjects)}
                {renderColumn(rightProjects)}
              </div>
            </div>
          ) : null}
          {leftOrganizations.length > 0 || rightOrganizations.length > 0 ? (
            <div>
              <h3 className="font-medium mb-1">Organizzazioni</h3>
              <div className="flex">
                {renderColumn(leftOrganizations)}
                {renderColumn(rightOrganizations)}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default TutorCard
