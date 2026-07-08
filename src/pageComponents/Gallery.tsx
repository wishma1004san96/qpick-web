'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';



const galleryImages = [
  { id: 1, src: '/assets/images/gallery/1.jpg' },
  { id: 2, src: '/assets/images/gallery/2.jpg' },
  { id: 3, src: '/assets/images/gallery/3.jpg' },
  { id: 4, src: '/assets/images/gallery/4.jpg' },
  { id: 5, src: '/assets/images/gallery/5.jpg' },
  { id: 6, src: '/assets/images/gallery/6.jpg' },
  { id: 7, src: '/assets/images/gallery/7.jpg' },
  { id: 8, src: '/assets/images/gallery/8.jpg' },
  { id: 9, src: '/assets/images/gallery/9.jpg' },
  { id: 10, src: '/assets/images/gallery/10.jpg' },
  { id: 11, src: '/assets/images/gallery/11.jpg' },
  { id: 12, src: '/assets/images/gallery/12.jpg' },
  { id: 13, src: '/assets/images/gallery/13.jpg' },
  { id: 14, src: '/assets/images/gallery/14.jpg' },
  { id: 15, src: '/assets/images/gallery/15.jpg' },
  { id: 16, src: '/assets/images/gallery/16.jpg' },
  { id: 17, src: '/assets/images/gallery/17.jpg' },
  { id: 18, src: '/assets/images/gallery/18.jpg' },
  { id: 19, src: '/assets/images/gallery/19.jpg' },
  { id: 20, src: '/assets/images/gallery/20.jpg' },
  { id: 21, src: '/assets/images/gallery/21.jpg' },
  { id: 22, src: '/assets/images/gallery/22.webp' },
  { id: 23, src: '/assets/images/gallery/23.webp' },
  { id: 24, src: '/assets/images/gallery/24.webp' },
  { id: 25, src: '/assets/images/gallery/25.jpeg' },
  { id: 26, src: '/assets/images/gallery/26.jpeg' },
  { id: 27, src: '/assets/images/gallery/27.jpeg' },
  { id: 28, src: '/assets/images/gallery/28.jpeg' },
  { id: 29, src: '/assets/images/gallery/29.jpeg' },
  { id: 30, src: '/assets/images/gallery/30.jpeg' },
  { id: 31, src: '/assets/images/gallery/31.jpeg' },
  { id: 32, src: '/assets/images/gallery/32.jpeg' },
  { id: 33, src: '/assets/images/gallery/33.jpeg' },
  { id: 34, src: '/assets/images/gallery/34.jpeg' },
  { id: 35, src: '/assets/images/gallery/35.jpeg' },
  { id: 36, src: '/assets/images/gallery/36.jpeg' },
  { id: 37, src: '/assets/images/gallery/37.jpeg' },
  { id: 38, src: '/assets/images/gallery/38.jpeg' },
  { id: 39, src: '/assets/images/gallery/39.jpeg' },
  { id: 40, src: '/assets/images/gallery/40.jpeg' },
  { id: 41, src: '/assets/images/gallery/41.jpeg' },
  { id: 42, src: '/assets/images/gallery/42.jpeg' },
  { id: 43, src: '/assets/images/gallery/43.jpeg' },
  { id: 44, src: '/assets/images/gallery/44.jpeg' },
  { id: 45, src: '/assets/images/gallery/45.jpeg' },
  { id: 46, src: '/assets/images/gallery/46.jpeg' },
  { id: 47, src: '/assets/images/gallery/47.jpeg' },
  { id: 48, src: '/assets/images/gallery/48.jpeg' },
  { id: 49, src: '/assets/images/gallery/49.jpeg' },
  { id: 50, src: '/assets/images/gallery/50.jpeg' },
  { id: 51, src: '/assets/images/gallery/51.jpeg' },
  { id: 52, src: '/assets/images/gallery/52.jpeg' },
  { id: 53, src: '/assets/images/gallery/53.jpeg' },
  { id: 54, src: '/assets/images/gallery/54.jpeg' },
  { id: 55, src: '/assets/images/gallery/55.jpeg' },
  { id: 56, src: '/assets/images/gallery/56.jpeg' },
  { id: 57, src: '/assets/images/gallery/57.jpeg' },
  { id: 58, src: '/assets/images/gallery/58.jpeg' },
  { id: 59, src: '/assets/images/gallery/59.jpeg' },
  { id: 60, src: '/assets/images/gallery/60.jpeg' },
  { id: 61, src: '/assets/images/gallery/61.jpeg' },
  { id: 62, src: '/assets/images/gallery/62.jpeg' },
  { id: 63, src: '/assets/images/gallery/63.jpeg' },
  { id: 64, src: '/assets/images/gallery/64.jpeg' },
  { id: 65, src: '/assets/images/gallery/65.jpeg' },
  { id: 66, src: '/assets/images/gallery/66.jpeg' },
  { id: 67, src: '/assets/images/gallery/67.jpeg' },
  { id: 68, src: '/assets/images/gallery/68.jpeg' },
  { id: 69, src: '/assets/images/gallery/69.jpeg' },
  { id: 70, src: '/assets/images/gallery/70.jpeg' },
  { id: 71, src: '/assets/images/gallery/71.jpeg' },
  { id: 72, src: '/assets/images/gallery/72.jpeg' },
];

interface LightboxProps {
  images: typeof galleryImages;
  activeIndex: number;
  onChangeIndex: (nextIndex: number) => void;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, activeIndex, onChangeIndex, onClose }) => {
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const active = images[activeIndex];

  const goPrev = useCallback(() => {
    const next = (activeIndex - 1 + images.length) % images.length;
    onChangeIndex(next);
  }, [activeIndex, images.length, onChangeIndex]);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % images.length;
    onChangeIndex(next);
  }, [activeIndex, images.length, onChangeIndex]);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchDeltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartXRef.current;
    const dy = touch.clientY - touchStartYRef.current;
    touchDeltaXRef.current = dx;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        isHorizontalSwipeRef.current = true;
      }
    }

    if (isHorizontalSwipeRef.current) {
      // Prevent the page from interpreting this as a scroll gesture.
      e.preventDefault();
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (!isHorizontalSwipeRef.current) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      touchDeltaXRef.current = 0;
      return;
    }

    const dx = touchDeltaXRef.current;
    const threshold = 60;
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDeltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, images.length, goNext, goPrev, onClose]);

  return (
    <div className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
        <div
          className="relative w-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white px-4 py-2 transition cursor-pointer"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-semibold">Back</span>
            </button>

            <div className="text-white/80 text-sm">
              {activeIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white p-2 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-black/30 border border-white/10">
            <div
              className="relative w-full h-[58vh] sm:h-[65vh] md:h-[68vh]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <Image
                src={active.src}
                alt="Gallery image"
                fill
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white transition cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 mx-auto" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white transition cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 mx-auto" />
            </button>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {images.map((img, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onChangeIndex(idx)}
                    className={`relative shrink-0 h-16 w-20 sm:h-18 sm:w-24 rounded-xl overflow-hidden border transition cursor-pointer ${
                      isActive ? 'border-white/70 ring-2 ring-white/40' : 'border-white/15 hover:border-white/35'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt="Thumbnail image"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 ${isActive ? 'bg-black/10' : 'bg-black/35'} transition`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(() => galleryImages, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Our Gallery"
        subtitle="Explore the beauty of Sri Lanka through our lens"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="bg-[#F8F9FA] dark:bg-[#0B1120] py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {images.map((image, index) => (
              <AnimatedSection
                key={image.id}
                animation="scale-up"
                className="group"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className="cursor-pointer relative overflow-hidden rounded-xl bg-white dark:bg-[#1C2537] shadow-lg outline-none"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt="Gallery image"
                      width={800}
                      height={800}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {typeof activeIndex === 'number' && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onChangeIndex={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
