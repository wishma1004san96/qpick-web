'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { tours } from '@/data/tours';

const preferredTourTitles = [
  'Classic Sri Lanka Tour',
  'Luxury Sri Lanka Experience',
  'Ramayana Trail Tour',
  'Sri Lanka Wildlife & Adventure Tour',
  'Hill Country Escape',
  'South Coast Explorer',
  'Tailor Made Tour',
];

const slugifyTourTitle = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\'’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const selectedTours = (() => {
  const ordered = preferredTourTitles
    .map((title) => tours.find((tour) => tour.title === title))
    .filter((tour): tour is (typeof tours)[number] => Boolean(tour));

  const fallback = tours.filter((tour) => !ordered.some((item) => item.title === tour.title)).slice(0, 7 - ordered.length);

  return [...ordered, ...fallback];
})();

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

interface TourCarouselProps {
  slidesPerView: number;
}

function TourCarousel({ slidesPerView }: TourCarouselProps) {
  const totalSlides = selectedTours.length;
  const cloneCount = Math.min(slidesPerView, totalSlides);

  const loopedTours = useMemo(
    () => [
      ...selectedTours.slice(-cloneCount),
      ...selectedTours,
      ...selectedTours.slice(0, cloneCount),
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
    if (isHovered || totalSlides <= 1) return;

    const intervalId = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [currentIndex, isHovered, totalSlides]);

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
        <div className="overflow-x-hidden overflow-y-visible pb-3">
          <div
            className="flex will-change-transform"
            style={{
              transform: `translate3d(-${currentIndex * (100 / slidesPerView)}%, 0, 0)`,
              transition: isAnimating ? 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopedTours.map((tour, index) => (
              <div
                key={`${tour.title}-${index}`}
                className={`shrink-0 ${
                  slidesPerView === 1 ? 'px-0' : 'px-2.5 first:pl-0 last:pr-0 md:px-3'
                }`}
                style={{
                  flexBasis: slidesPerView === 1 ? '100%' : `${100 / slidesPerView}%`,
                  minWidth: slidesPerView === 1 ? '100%' : undefined,
                  maxWidth: slidesPerView === 1 ? '100%' : undefined,
                }}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_22px_56px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-black/45"
                >
                  <div className="relative h-[420px] overflow-hidden md:h-[460px]">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/42 to-slate-950/18" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.12),transparent_34%)]" />

                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
                      <Clock3 className="h-3.5 w-3.5 text-sky-200" />
                      {tour.duration}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <div className="rounded-[1.35rem] border border-white/15 bg-slate-950/45 p-5 backdrop-blur-2xl">
                        <h3 className="text-2xl font-semibold tracking-[-0.025em] text-white">{tour.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-200/90">{tour.shortDescription}</p>

                        <div className="mt-5 flex items-center justify-between gap-3">
                          <div className="inline-flex min-w-0 items-center gap-2 text-sm text-slate-100/90">
                            <MapPin className="h-4 w-4 shrink-0 text-sky-200" />
                            <span className="truncate">{tour.location}</span>
                          </div>

                          <Link
                            href={`/tours/${slugifyTourTitle(tour.title)}`}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300"
                          >
                            Explore Package
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-sky-600 shadow-[0_14px_32px_rgba(15,23,42,0.16)] backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:shadow-black/40 dark:hover:bg-slate-800 lg:flex"
          aria-label="Previous tours"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-sky-600 shadow-[0_14px_32px_rgba(15,23,42,0.16)] backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:shadow-black/40 dark:hover:bg-slate-800 lg:flex"
          aria-label="Next tours"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-7 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goToPrevious}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-sky-600 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-110 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:shadow-black/40 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Previous tours"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {selectedTours.map((tour, index) => (
            <button
              key={tour.title}
              type="button"
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index + cloneCount);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeDotIndex === index
                  ? 'w-8 bg-sky-500 dark:bg-sky-400'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to tour slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-sky-600 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-110 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:shadow-black/40 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Next tours"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default function PremiumTourPackagesCarousel() {
  const viewportWidth = useSyncExternalStore(subscribeToViewport, getViewportWidth, () => 1280);
  const slidesPerView = getSlidesPerView(viewportWidth);

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(56,189,248,0.08),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.06),transparent_30%)] dark:bg-[radial-gradient(circle_at_14%_14%,rgba(56,189,248,0.12),transparent_36%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.1),transparent_34%)]" />
      <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/15" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/16 blur-3xl dark:bg-cyan-500/10" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-100 dark:shadow-black/20">
            <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-300" />
            SIGNATURE TOURS
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Discover Sri Lanka with Our Signature Tour Packages
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            From cultural heritage and wildlife adventures to luxury beach escapes and tailor-made experiences, explore Sri
            Lanka through carefully designed journeys by Q Pick.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <TourCarousel key={slidesPerView} slidesPerView={slidesPerView} />
        </motion.div>
      </div>
    </section>
  );
}
