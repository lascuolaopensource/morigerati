import React from 'react'
import Colorcard from '@/components/colorCard'

interface Media {
  url: string
}

interface Doc {
  nome: string
  media: Media
  id: string
}

interface JsonData {
  docs?: Doc[]
}

interface ColorCardWrapperProps {
  color: string
  jsonString: string
  previous: string
}

const ColorCardWrapper: React.FC<ColorCardWrapperProps> = ({ color, jsonString, previous }) => {
  let data: JsonData = { docs: [] }

  try {
    data = JSON.parse(jsonString)
  } catch (error) {
    console.error('Errore nel parsing del JSON:', error)
    return <div>Errore nel caricamento dei dati</div>
  }

  if (!data || !Array.isArray(data.docs) || data.docs.length === 0) {
    return <div></div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.docs.map((doc) => (
        <Colorcard
          key={doc.id}
          color={color}
          title={doc.nome}
          imageUrl={doc.media?.url}
          slugUrl={doc.id}
          previous={previous}
        />
      ))}
    </div>
  )
}

export default ColorCardWrapper
