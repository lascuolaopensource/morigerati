import React from 'react'

interface DateDaDefinireBannerProps {
  linkText: string
  linkUrl: string
}

const DateDaDefinireBanner: React.FC<DateDaDefinireBannerProps> = ({ linkText, linkUrl }) => {
  return (
    <div className="bg-residenzeColor p-2 border-2 border-residenzeColorScuro text-center ">
      <p className="text-black pt-2 px-4">
        Date ancora non annunciate, controllate{' '}
        <a href={linkUrl} className="underline font-bold">
          {linkText}
        </a>
      </p>
    </div>
  )
}

export default DateDaDefinireBanner
