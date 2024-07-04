import React from 'react'

const Luogo: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border-4 border-black rounded-lg overflow-hidden">
        <div className="bg-sky-200 p-2 border-b-4 border-black">
          <h2 className="text-xl font-bold text-center">Luogo</h2>
        </div>
        <div className="grid grid-cols-12 gap-px bg-gray-300">
          {[...Array(60)].map((_, index) => (
            <div key={index} className="h-8 bg-white"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Luogo
