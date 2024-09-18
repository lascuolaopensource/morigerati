import React from 'react'

const MediumCard: React.FC<{ imageSrc?: string; title?: string }> = ({
  imageSrc = '',
  title = 'ciao',
}) => {
  return (
    <div className="border border-black rounded-lg overflow-hidden bg-white w-64 h-64 flex flex-col">
      <div className="flex-grow">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 border-b border-black">&nbsp;</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="m-0 text-center text-xl">{title || ' '}</h3>
      </div>
    </div>
  )
}

export default MediumCard
