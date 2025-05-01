'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

type Image = {
  image: { url: string }
  alt: string
}

type Props = {
  images: Image[]
  autoplay?: boolean
  loop?: boolean
  showControls?: boolean
  showPagination?: boolean
  theme?: {
    primaryClass?: string
    secondaryClass?: string
    tertiaryClass?: string
  }
}

export const TestImageSlider = ({
                                  images,
                                  autoplay = true,
                                  loop = true,
                                  showControls = true,
                                  showPagination = true,
                                  theme,
                                }: Props) => {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? (loop ? 0 : prev) : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? (loop ? images.length - 1 : 0) : prev - 1))
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, current])

  if (!images || images.length === 0) {
    return <p className="text-center text-white">Keine Bilder vorhanden.</p>
  }

  const wrapperClass = theme?.primaryClass || 'bg-zinc-900 text-white'
  const buttonClass = theme?.secondaryClass || 'bg-black/50 text-white hover:bg-black/70'
  const dotActiveClass = theme?.secondaryClass || 'bg-blue-600'
  const dotInactiveClass = theme?.tertiaryClass || 'bg-gray-300'

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto overflow-hidden p-6 rounded-md ${wrapperClass}`}
    >
      <div className="w-full transition-all duration-500">
        <img
          src={images[current]?.image?.url}
          alt={images[current]?.alt ?? 'Bild'}
          className="w-full h-auto mx-auto object-contain"
        />
      </div>

      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-3xl w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition z-20 ${buttonClass}`}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-3xl w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition z-20 ${buttonClass}`}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {showPagination && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={clsx(
                'w-4 h-4 rounded-full transition-all duration-300',
                current === index ? dotActiveClass : dotInactiveClass,
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
