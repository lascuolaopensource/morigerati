'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { FaPlay } from 'react-icons/fa'

export interface GalleryCardProps {
  media: Media
  height?: number
}

const GalleryCard: React.FC<GalleryCardProps> = ({ media, height = 240 }) => {
  if (!media) return null

  const isVideo = media.mimeType?.startsWith('video/')
  const aspectRatio = media.width && media.height ? `${media.width}/${media.height}` : '1/1'
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Usa Intersection Observer per rilevare quando la card diventa visibile
  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      {
        root: null, // osserva rispetto al viewport
        rootMargin: '200px', // inizia a caricare quando è a 200px dal viewport
        threshold: 0.1, // quando almeno il 10% è visibile
      },
    )

    observer.observe(cardRef.current)

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // Carica l'anteprima solo quando la card è visibile
  useEffect(() => {
    if (!isVideo || !isVisible || !videoRef.current || isLoaded) return

    const video = videoRef.current

    // Configurazione per il caricamento dell'anteprima
    const loadThumbnail = () => {
      try {
        // Carica solo i metadati e il primo frame
        video.preload = 'metadata'

        // Callback quando i metadati sono caricati
        const handleLoadedMetadata = () => {
          try {
            // Imposta il currentTime a un valore piccolo per il primo frame
            video.currentTime = 0.1
          } catch (e) {
            console.error('Errore nel set currentTime:', e)
          }
        }

        // Callback quando il currentTime è cambiato e ha caricato un frame
        const handleSeeked = () => {
          setIsLoaded(true)
          // Rimuovi i listener non più necessari
          video.removeEventListener('loadedmetadata', handleLoadedMetadata)
          video.removeEventListener('seeked', handleSeeked)
        }

        // Aggiungi i listener
        video.addEventListener('loadedmetadata', handleLoadedMetadata)
        video.addEventListener('seeked', handleSeeked)

        // Gestisci errori
        video.onerror = () => {
          console.error('Errore nel caricamento del video:', video.error)
          setIsLoaded(true) // Considera come caricato anche in caso di errore
        }
      } catch (error) {
        console.error('Errore nel caricamento del thumbnail:', error)
        setIsLoaded(true)
      }
    }

    // Avvia il caricamento dopo un breve ritardo per dare priorità ad altro
    const timer = setTimeout(loadThumbnail, 100)

    return () => {
      clearTimeout(timer)
      if (videoRef.current) {
        videoRef.current.onerror = null
        // Rimuovi eventuali listener rimasti
        videoRef.current.removeEventListener('loadedmetadata', () => {})
        videoRef.current.removeEventListener('seeked', () => {})
      }
    }
  }, [isVideo, isVisible, isLoaded])

  return (
    <div
      ref={cardRef}
      style={{ aspectRatio }}
      className="relative border-2 border-black rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95 cursor-pointer h-[180px] sm:h-[240px] max-w-[calc(100vw-4rem)] sm:max-w-none"
    >
      {isVideo ? (
        <>
          <div className="relative w-full h-full">
            {/* Placeholder mostrato mentre il video si carica */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              </div>
            )}

            {/* Video element che mostra solo il primo frame */}
            <video
              ref={videoRef}
              src={media.url as string}
              className={`absolute inset-0 w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              muted
              playsInline
              preload="none" // Non caricare fino a quando non decidiamo noi
            />

            {/* Overlay scuro e controlli */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              {/* Pulsante play moderno e flat */}
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 group">
                {/* Triangolo play con stile flat */}
                <div className="w-0 h-0 ml-1.5 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-black/80 group-hover:border-l-black"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Image
          src={media.sizes?.medium?.url || media.sizes?.small?.url || (media.url as string)}
          alt={media.alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  )
}

export default GalleryCard
