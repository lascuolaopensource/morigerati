import React from 'react'

const BigCard: React.FC = () => {
  return (
    <div className="h-48 bg-transparent border border-black rounded-lg flex">
      <div className="w-1/2 h-full">
        <img
          src="https://via.placeholder.com/50"
          alt="Placeholder"
          className="object-cover w-full h-full rounded-l-lg border-r border-black"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-start items-start p-2">
        <h3 className="text-xl">Title</h3>

        <p className="text-xs">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit quo, eius suscipit nesciunt
          similique quidem veritatis quos unde ...
        </p>
      </div>
    </div>
  )
}

export default BigCard
