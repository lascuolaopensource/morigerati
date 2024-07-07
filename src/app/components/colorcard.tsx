import React from 'react'

interface ColorcardProps {
  color: string
  title: string
}

const Colorcard: React.FC<ColorcardProps> = ({ color, title }) => {
  return (
    <div className="w-full max-w-md mx-auto pb-1">
      <div className="border-2 border-black rounded overflow-hidden">
        <div className={`${color} p-2 border-b-2 border-black`}>
          <h2 className="text-sm font-bold text-center leading-3">{title}</h2>
        </div>
        <div className="grid grid-cols-12 gap-px bg-gray-300">
          {[...Array(60)].map((_, index) => (
            <div key={index} className="h-5 bg-white"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Colorcard
