import type { CarouselProps } from '@/types/types';
import React, { useCallback, useEffect, useRef, useState } from 'react'

export const useCarousel = ({ banners, autoInterval = 5000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const hasMultiple = banners.length > 1

  const goToNext = useCallback(() => {
    if (!hasMultiple) return
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length, hasMultiple])

  const goToPrev = useCallback(() => {
    if (!hasMultiple) return
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length, hasMultiple])

  const goToSlide = useCallback((index: number) => {
    if (!hasMultiple) return
    setCurrentIndex(index)
  }, [hasMultiple])

  // Autoplay
  useEffect(() => {
    if (!hasMultiple || isHovered) return

    const interval = setInterval(goToNext, autoInterval)
    return () => clearInterval(interval)
  }, [isHovered, autoInterval, goToNext, hasMultiple])

  // Keyboard navigation global
  useEffect(() => {
    if (!hasMultiple) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrev()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goToNext, goToPrev, hasMultiple])

  // Swipe mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current

    if (distance > 50) goToNext()
    if (distance < -50) goToPrev()

    touchStartX.current = null
    touchEndX.current = null
  }

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      action()
    }
  }

  return {
    currentIndex,
    goToPrev,
    goToNext,
    goToSlide,
    setIsHovered,
    handleKeyDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    hasMultiple
  }
}