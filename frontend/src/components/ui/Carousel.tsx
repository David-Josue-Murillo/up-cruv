import { useCarousel } from "@/lib/hooks/useCarousel";
import type { CarouselProps } from "@/types/types";

export default function Carousel({ banners, autoInterval = 5000 }: CarouselProps) {
  if (banners.length === 0) return null;

  const {
    currentIndex,
    goToPrev,
    goToNext,
    goToSlide,
    setIsHovered,
    handleKeyDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    hasMultiple,
  } = useCarousel({ banners, autoInterval });

  return (
    <section
      className='relative mx-auto w-full max-w-[1300px] px-4 py-12'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='region'
      aria-roledescription='carousel'
      aria-label='Carrusel principal'
    >
      <div
        className='relative w-full aspect-1150/350 overflow-hidden rounded-3xl shadow-xl'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              aria-hidden={!isActive}
            >
              <img src={banner.image} alt={banner.title} className='w-full h-full object-cover object-center' draggable={false} />
            </div>
          );
        })}

        {/* Flecha Izquierda */}
        {hasMultiple && (
          <button
            onClick={goToPrev}
            onKeyDown={(e) => handleKeyDown(e, goToPrev)}
            className='group absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-green-950/60 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-gold-500/80 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400'
            aria-label='Banner anterior'
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='h-5 w-5 text-gold-400 transition-colors group-hover:text-white'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </button>
        )}

        {/* Flecha Derecha */}
        {hasMultiple && (
          <button
            onClick={goToNext}
            onKeyDown={(e) => handleKeyDown(e, goToNext)}
            className='group absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-green-950/60 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-gold-500/80 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400'
            aria-label='Siguiente banner'
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='h-5 w-5 text-gold-400 transition-colors group-hover:text-white'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        )}

        {/* Dots */}
        {hasMultiple && (
          <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2'>
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onKeyDown={(e) => handleKeyDown(e, () => goToSlide(index))}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 ${
                  index === currentIndex
                    ? 'w-8 bg-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                    : 'w-2 bg-black/60 hover:bg-gold-400/70'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
