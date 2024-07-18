import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import IG from '@/public/IG.png'
import YT from '@/public/YT.png'
import { loadDb } from '@/utils/db'

const Footer = async () => {
  const db = await loadDb()
  const footer = await db.findGlobal({ slug: 'footer' })

  const splitSubtitle = (subtitle: string | undefined) => {
    if (!subtitle) return ['', '']
    const words = subtitle.split(' ')
    if (words.length <= 1) return [subtitle, '']
    return [words.slice(0, -1).join(' '), words[words.length - 1]]
  }

  const [subtitleFirstPart, subtitleLastWord] = splitSubtitle(footer?.Subtitle)

  return (
    <footer className="bg-black text-white px-4 pt-6">
      <div>
        <div className="flex space-x-4 items-center">
          <div className="flex-1">
            <Image src={logo} alt="Logo" width={140} height={100} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-xs leading-3">{footer?.Title || ''}</p>
            <p className="font-light text-[12px] w-full block leading-3 text-right whitespace-nowrap">
              {subtitleFirstPart}
            </p>
            <p className="font-light text-[12px] w-full block leading-3 text-right whitespace-nowrap">
              {subtitleLastWord}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 items-top pt-6">
          <div className="flex-1">
            <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
              {footer.via_line_1 || ''}
            </p>
            <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
              {footer.civico_e_cap || ''}
            </p>
            <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
              {footer.citta || ''}
            </p>
            <p className="pt-1">
              <span className="font-bold leading-3 whitespace-nowrap text-[10px]">email: </span>
              <a
                href={`mailto:${footer.mail || ''}`}
                className="font-normal leading-3 whitespace-nowrap text-[10px]"
              >
                {footer.mail || ''}
              </a>
            </p>
          </div>
          <div className="flex-1">
            <p className="font-bold leading-3 whitespace-nowrap text-[10px]">Orari di apertura:</p>
            <div className="leading-tight pt-3">
              <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
                {footer?.Orario_1 || ''}
              </p>
              <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
                {footer?.Orario_2 || ''}
              </p>
              <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
                {footer?.Orario_3 || ''}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4 flex space-x-4 items-center justify-end">
        <a href={footer?.Link_youtube || '#'} target="_blank" rel="noopener noreferrer">
          <Image src={YT} alt="Youtube" width={24} />
        </a>
        <a href={footer?.Link_instagram || '#'} target="_blank" rel="noopener noreferrer">
          <Image src={IG} alt="Instagram" width={24} />
        </a>
      </div>
      <div className="pb-5"></div>
    </footer>
  )
}

export default Footer
