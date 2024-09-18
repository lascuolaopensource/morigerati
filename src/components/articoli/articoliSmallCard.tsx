import React from 'react'

const SmallCard: React.FC = () => {
  return (
    <div className="bg-transparent border border-black rounded-lg flex flex-col h-full">
      <div className="p-4 flex flex-col h-full">
        <h1 className="font-bold">Titolo</h1>

        <div className="flex-grow"></div>
      </div>
    </div>
  )
}

export default SmallCard
