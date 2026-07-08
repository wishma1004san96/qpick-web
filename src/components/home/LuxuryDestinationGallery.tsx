'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, MapPin, Mountain, Waves } from 'lucide-react';

const destinations = [
  {
    name: 'Sigiriya',
    category: 'Heritage',
    duration: 'Half day',
    description: 'Private access-style itineraries around the ancient rock fortress and Cultural Triangle.',
    image: '/images/hero/sigiriya.webp',
    href: '/destinations/sigiriya',
  },
  {
    name: 'Ella',
    category: 'Highlands',
    duration: '2 days',
    description: 'Tea hills, mountain railways, and luxury stays with cinematic viewpoints.',
    image: '/images/hero/ella-nine-arch-bridge.webp',
    href: '/destinations/ella',
  },
  {
    name: 'Mirissa',
    category: 'Coastline',
    duration: '1 day',
    description: 'Golden-sand beaches, whale watching, and elevated south-coast escapes.',
    image: '/images/hero/mirissa-sri-lanka.webp',
    href: '/destinations/mirissa',
  },
  {
    name: 'Nuwara Eliya',
    category: 'Tea Country',
    duration: '2 days',
    description: 'Cool-climate retreats, colonial charm, and misty highland landscapes.',
    image: '/images/hero/nuwara-eliya-sri-lanka.webp',
    href: '/destinations/nuwara-eliya',
  },
  {
    name: 'Galle',
    category: 'South Coast',
    duration: '1 day',
    description: 'Fort walls, boutique dining, and polished coastal luxury.',
    image: '/images/destinations/galle/fort-ramparts-and-bastions-galle.avif',
    href: '/destinations/galle',
  },
];

const iconByCategory: Record<string, typeof Mountain> = {
  Heritage: Mountain,
  Highlands: Mountain,
  Coastline: Waves,
  'Tea Country': Mountain,
  'South Coast': Waves,
};

const subscribeToViewport = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
};

const getViewportWidth = () => (typeof window === 'undefined' ? 1280 : window.innerWidth);

const getSlidesPerView = (viewportWidth: number) => {
  if (viewportWidth >= 1024) return 3;
  if (viewportWidth >= 768) return 2;
  return 1;
};

interface DestinationCarouselProps {
  slidesPerView: number;
}

const DestinationCarousel = ({ slidesPerView }: DestinationCarouselProps) => {
  const totalSlides = destinations.length;
  const cloneCount = slidesPerView;
  const loopedDestinations = useMemo(
    () => [
      ...destinations.slice(-cloneCount),
      ...destinations,
      ...destinations.slice(0, cloneCount),
    ],
    [cloneCount]
  );

  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);
  const pointerDeltaXRef = useRef(0);
  const isPointerDraggingRef = useRef(false);

  const goToNext = () => {
    setIsAnimating(true);
    setCurrentIndex((previous) => previous + 1);
  };

  const goToPrevious = () => {
    setIsAnimating(true);
    setCurrentIndex((previous) => previous - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= totalSlides + cloneCount) {
      setIsAnimating(false);
      setCurrentIndex(cloneCount);
      return;
    }

    if (currentIndex < cloneCount) {
      setIsAnimating(false);
      setCurrentIndex(currentIndex + totalSlides);
    }
  };

  useEffect(() => {
    if (isAnimating) return;

    const animationFrame = window.requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isAnimating]);

  useEffect(() => {
    if (isHovered) return;

    const intervalId = window.setInterval(() => {
      goToNext();
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [currentIndex, isHovered]);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;
    pointerDeltaXRef.current = 0;
    isPointerDraggingRef.current = false;
    setIsHovered(true);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerStartXRef.current === null || pointerStartYRef.current === null) return;

    const deltaX = event.clientX - pointerStartXRef.current;
    const deltaY = event.clientY - pointerStartYRef.current;
    pointerDeltaXRef.current = deltaX;

    if (!isPointerDraggingRef.current && Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
      isPointerDraggingRef.current = true;
    }
  };

  const onPointerEnd: React.PointerEventHandler<HTMLDivElement> = () => {
    const dragged = isPointerDraggingRef.current;
    const deltaX = pointerDeltaXRef.current;

    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
    pointerDeltaXRef.current = 0;
    isPointerDraggingRef.current = false;
    setIsHovered(false);

    if (!dragged) return;

    const threshold = 60;
    if (deltaX > threshold) goToPrevious();
    if (deltaX < -threshold) goToNext();
  };

  const activeDotIndex = ((currentIndex - cloneCount) % totalSlides + totalSlides) % totalSlides;

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <div className="relative">
        <div className="overflow-hidden pb-4">
          <div
            className="flex will-change-transform"
            style={{
              transform: `translate3d(-${currentIndex * (100 / slidesPerView)}%, 0, 0)`,
              transition: isAnimating ? 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopedDestinations.map((destination, index) => {
              const Icon = iconByCategory[destination.category] || MapPin;

              return (
                <div
                  key={`${destination.name}-${index}`}
                  className="shrink-0 px-2.5 first:pl-0 last:pr-0 md:px-3"
                  style={{ flexBasis: `${100 / slidesPerView}%` }}
                >
                  <motion.article
                    whileHover={{ y: -10, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition duration-300 dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    <div className="relative h-[520px] overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/16 to-black/8" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_28%)]" />

                      <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3 text-white">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-xl">
                          <Icon className="h-3.5 w-3.5 text-sky-200" />
                          {destination.category}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-1.5 text-xs font-semibold backdrop-blur-xl">
                          <Clock3 className="h-3.5 w-3.5 text-sky-200" />
                          {destination.duration}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <div className="max-w-xl rounded-[1.5rem] border border-white/15 bg-slate-950/34 p-5 backdrop-blur-2xl">
                          <p className="text-xs uppercase tracking-[0.26em] text-sky-100/70">{destination.category}</p>
                          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white">{destination.name}</h3>
                          <p className="mt-3 text-sm leading-6 text-slate-200/90">{destination.description}</p>

                          <div className="mt-5 flex items-center justify-between gap-4">
                            <div className="inline-flex items-center gap-2 text-sm text-slate-100/90">
                              <MapPin className="h-4 w-4 text-sky-200" />
                              Private chauffeur journeys
                            </div>

                            <Link
                              href={destination.href}
                              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
                            >
                              Explore
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 p-3 text-gray-900 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white dark:border-white/10 dark:bg-[#1C2537]/90 dark:text-white lg:flex"
          aria-label="Previous destinations"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 p-3 text-gray-900 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white dark:border-white/10 dark:bg-[#1C2537]/90 dark:text-white lg:flex"
          aria-label="Next destinations"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-7 flex items-center justify-center gap-3">
        <button
          onClick={goToPrevious}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-white lg:hidden"
          aria-label="Previous destinations"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {destinations.map((destination, index) => (
            <button
              key={destination.name}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index + cloneCount);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeDotIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-gray-300 hover:bg-primary/50 dark:bg-white/20 dark:hover:bg-white/40'
              }`}
              aria-label={`Go to destination slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-white lg:hidden"
          aria-label="Next destinations"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default function LuxuryDestinationGallery() {
  const viewportWidth = useSyncExternalStore(subscribeToViewport, getViewportWidth, () => 1280);
  const slidesPerView = getSlidesPerView(viewportWidth);

  return (
    <section id="destinations" className="relative overflow-hidden bg-[#F7F9FC] py-16 sm:py-20 dark:bg-[#08111F]">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.12),transparent_26%),radial-gradient(circle_at_70%_90%,rgba(99,102,241,0.1),transparent_24%)]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-4 py-2 text-primary-dark backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-sky-200">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Signature destinations
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Curated destination gallery
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Scroll through Sri Lanka’s most iconic regions, presented like a luxury magazine spread with immersive photography and fast route discovery.
          </p>
        </motion.div>

        <DestinationCarousel key={slidesPerView} slidesPerView={slidesPerView} />
      </div>
    </section>
  );
}
