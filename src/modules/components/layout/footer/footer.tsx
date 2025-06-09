//Boilerplate
import React from 'react'
//Utils
import { renderFooterContent } from '@/modules/components/layout/footer/footerRenderElement'
//UI
import { SocialIcon } from 'react-social-icons'
import LogoGenerator from '@/modules/components/uiElements/logo'
//DB
import type { Footer as FooterType } from '@/payload-types'
import PixelBorder from '@/modules/components/uiElements/pixelBorder'

//

const Footer = async ({ footer }: { footer: FooterType }) => {
  return (
    <>
      <PixelBorder className="w-full bg-black" />
      <footer className="bg-black text-white px-4 md:px-8 py-12">
        {/* mobile */}
        <div className="sm:hidden max-w-screen-xl mx-auto flex flex-col items-left gap-y-4">
          <div className="flex justify-between">
            <LogoGenerator textColor="white" />
            <SocialIcons footer={footer} />
          </div>
          <TextContent footer={footer} className="flex-1" />
        </div>

        {/* desktop */}
        <div className="hidden sm:flex max-w-screen-xl mx-auto justify-between">
          <LogoGenerator textColor="white" />
          <TextContent footer={footer} className="w-1/4" />
          <SocialIcons footer={footer} />
        </div>
      </footer>
    </>
  )
}

export default Footer

//

function TextContent(props: { footer: FooterType; className: string }) {
  const { footer, className } = props
  return (
    <>
      <div className={className}>
        {footer?.testo_sinistra && renderFooterContent(footer.testo_sinistra)}
      </div>
      <div className={className}>
        {footer?.testo_destra && renderFooterContent(footer.testo_destra)}
      </div>
    </>
  )
}

function SocialIcons({ footer }: { footer: FooterType }) {
  return (
    <div className="flex space-x-2">
      {footer?.['Link Social']?.map((social: { link: string }, index: number) => (
        <SocialIcon
          key={index}
          url={social.link}
          style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
        />
      ))}
    </div>
  )
}
