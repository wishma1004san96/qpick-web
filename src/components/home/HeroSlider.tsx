'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { heroSlides } from '@/data/heroSlides';

const transitionMs = 600;
const autoSlideMs = 5000;

const stackCardLayouts = [
  'left-0 bottom-0 z-40 h-[386px] w-full max-w-none sm:w-[22rem] sm:max-w-[24rem] sm:h-[472px] lg:h-[570px] lg:w-[25rem] xl:w-[26.25rem]',
  'left-full bottom-[24px] z-30 h-[338px] w-full max-w-none sm:left-[47%] sm:w-[19.25rem] sm:max-w-[21rem] sm:bottom-[29.5px] sm:h-[413px] lg:left-[48%] lg:bottom-[35.5px] lg:h-[499px] lg:w-[21.875rem] xl:left-[49%] xl:w-[22.97rem]',
  'left-[200%] bottom-[58px] z-20 h-[270px] w-full max-w-none sm:left-[74%] sm:w-[15.4rem] sm:max-w-[16.8rem] sm:bottom-[71px] sm:h-[330px] lg:left-[75%] lg:bottom-[85.5px] lg:h-[399px] lg:w-[17.5rem] xl:left-[76%] xl:w-[18.375rem]',
  'left-[300%] bottom-[87px] z-10 h-[212px] w-full max-w-none sm:left-[90%] sm:w-[12.1rem] sm:max-w-[13.2rem] sm:bottom-[106px] sm:h-[260px] lg:left-[90.5%] lg:bottom-[128px] lg:h-[314px] lg:w-[13.75rem] xl:left-[91%] xl:w-[14.44rem]',
];

const stackCardDepthClasses = [
  'opacity-100 shadow-[0_36px_92px_rgba(8,15,35,0.48)]',
  'opacity-92 shadow-[0_24px_62px_rgba(8,15,35,0.28)]',
  'opacity-80 shadow-[0_18px_46px_rgba(8,15,35,0.20)]',
  'opacity-68 shadow-[0_12px_30px_rgba(8,15,35,0.14)]',
];

type HeroSliderProps = {
  compact?: boolean;
};

export default function HeroSlider({ compact = false }: HeroSliderProps) {
  const slides = heroSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const autoSlideIntervalRef = useRef<number | null>(null);

  const activeSlide = slides[activeIndex];
  const totalSlides = slides.length;
  const stackedSlides = Array.from({ length: Math.min(4, totalSlides) }, (_, offset) => ({
    slide: slides[(activeIndex + offset) % totalSlides],
    offset,
  }));

  const beginTransition = useCallback(() => {
    setIsTransitioning(true);

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, transitionMs);
  }, []);

  const clearAutoSlide = useCallback(() => {
    if (autoSlideIntervalRef.current !== null) {
      window.clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    clearAutoSlide();

    if (isHovered || totalSlides <= 1) {
      return;
    }

    autoSlideIntervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
      beginTransition();
    }, autoSlideMs);
  }, [beginTransition, clearAutoSlide, isHovered, totalSlides]);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex) {
        return;
      }

      setActiveIndex(nextIndex);
      beginTransition();
      startAutoSlide();
    },
    [activeIndex, beginTransition, startAutoSlide]
  );

  const shiftSlide = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => (current + direction + totalSlides) % totalSlides);
      beginTransition();
      startAutoSlide();
    },
    [beginTransition, startAutoSlide, totalSlides]
  );

  const goToPrevious = useCallback(() => {
    shiftSlide(-1);
  }, [shiftSlide]);

  const goToNext = useCallback(() => {
    shiftSlide(1);
  }, [shiftSlide]);

  useEffect(() => {
    if (isHovered) {
      clearAutoSlide();
      return;
    }

    startAutoSlide();

    return () => {
      clearAutoSlide();

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [clearAutoSlide, isHovered, startAutoSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }

      if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrevious]);

  const sliderPanel = (
    <div
      className="relative min-h-[390px] overflow-hidden sm:overflow-visible sm:min-h-[480px] lg:min-h-[570px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-2 top-8 h-64 w-64 rounded-full bg-sky-400/18 blur-3xl motion-safe:animate-pulse sm:left-4 sm:h-72 sm:w-72" />
      <div className="absolute right-2 top-24 h-56 w-56 rounded-full bg-blue-500/18 blur-3xl motion-safe:animate-pulse motion-safe:[animation-delay:1s] sm:right-4 sm:h-64 sm:w-64" />

      <div className="relative h-full min-h-[390px] overflow-hidden sm:overflow-visible sm:min-h-[480px] lg:min-h-[570px]">
        {stackedSlides.map(({ slide, offset }) => {
          const isActiveCard = offset === 0;

          return (
            <article
              key={slide.id}
              className={`absolute overflow-hidden rounded-[30px] border border-white/14 bg-white/10 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${stackCardLayouts[offset]} ${stackCardDepthClasses[offset]}`}
              aria-hidden={!isActiveCard}
            >
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={offset === 0}
                  quality={95}
                  sizes={
                    isActiveCard
                      ? '(min-width: 1280px) 432px, (min-width: 1024px) 400px, (min-width: 640px) 344px, 100vw'
                      : '(min-width: 1280px) 176px, (min-width: 1024px) 168px, 140px'
                  }
                  className={`object-cover transition-transform duration-700 hover:scale-105 ${slide.positionClass}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-slate-950/8 to-white/8" />
              </div>

              <div className="absolute inset-0 rounded-[30px] border border-white/10" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <div className={`inline-flex max-w-full items-center rounded-full border border-white/10 bg-slate-950/42 px-4 py-2 backdrop-blur-xl ${isActiveCard ? '' : 'px-3 py-1.5'}`}>
                  <p className={`truncate font-semibold text-white ${isActiveCard ? 'text-base sm:text-lg' : 'text-sm'}`}>
                    {slide.title}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous slide"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to ${slide.title}`}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                  isActive ? 'w-10 bg-sky-400' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  if (compact) {
    return <div className="relative w-full">{sliderPanel}</div>;
  }

  return (
    <section id="home" aria-label="Hero destinations slider" className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedData={() => setIsVideoReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/hero-background-15s.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,15,30,0.30),rgba(5,15,30,0.15),rgba(5,15,30,0.05))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_right,rgba(14,165,233,0.08),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div
            className={`relative z-10 max-w-2xl transition-all duration-500 ease-out ${
              isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100 shadow-lg shadow-sky-500/10 backdrop-blur-xl sm:text-sm">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-100">Premium island journeys</span>
              <span className="hidden sm:inline">Trusted by travelers</span>
            </div>

            <div className="mt-7 flex items-center gap-4 text-sm text-slate-200/90">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-white/20" />
              <span>{activeSlide.accent}</span>
            </div>

            <h1 className="mt-6 max-w-[10.5ch] text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.2rem]">
              {activeSlide.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200/90 sm:text-lg lg:max-w-lg lg:text-[1.15rem]">
              {activeSlide.description}
            </p>

            <p className="mt-5 text-sm font-medium uppercase tracking-[0.24em] text-sky-100/90">{activeSlide.route}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={activeSlide.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-8 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-lg hover:shadow-sky-400/20"
              >
                {activeSlide.primaryCta.label}
              </Link>

              <Link
                href={activeSlide.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25"
              >
                {activeSlide.secondaryCta.label}
              </Link>
            </div>

            <dl className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                { value: '24/7', label: 'Travel support' },
                { value: '5+', label: 'Years of service' },
                { value: 'Island', label: 'Wide coverage' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 shadow-xl shadow-black/10 backdrop-blur-xl">
                  <dt className="text-2xl font-semibold text-white">{item.value}</dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-300">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">{sliderPanel}</div>
        </div>
      </div>
    </section>
  );
}
