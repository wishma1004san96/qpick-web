"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";

const transitionMs = 600;
const autoSlideMs = 6000;

const stackCardLayouts = [
  "left-0 top-4 z-40 h-[380px] w-[74vw] max-w-[23rem] sm:h-[460px] sm:w-[21.5rem] lg:h-[560px] lg:w-[25rem] xl:w-[27rem]",
  "left-[63%] top-12 z-30 h-[250px] w-[8rem] -translate-x-1/2 sm:left-[66%] sm:h-[302px] sm:w-[9rem] lg:left-[65%] lg:top-12 lg:h-[358px] lg:w-[10.5rem] xl:left-[67%]",
  "left-[77%] top-20 z-20 h-[224px] w-[6.75rem] -translate-x-1/2 sm:left-[79%] sm:h-[270px] sm:w-[7.5rem] lg:left-[80%] lg:top-20 lg:h-[316px] lg:w-[8.5rem] xl:left-[81.5%]",
  "left-[89%] top-28 z-10 h-[196px] w-[5.75rem] -translate-x-1/2 opacity-90 sm:left-[91%] sm:h-[236px] sm:w-[6.5rem] lg:left-[92.5%] lg:top-28 lg:h-[280px] lg:w-[7.5rem] xl:left-[94%]",
];

export default function HeroSlider() {
  const slides = heroSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const autoSlideIntervalRef = useRef<number | null>(null);

  const activeSlide = slides[activeIndex];
  const totalSlides = slides.length;
  const stackedSlides = Array.from({ length: Math.min(4, totalSlides) }, (_, offset) => ({
    slide: slides[(activeIndex + offset) % totalSlides],
    offset,
  }));

  const beginTransition = () => {
    setIsTransitioning(true);

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, transitionMs);
  };

  const clearAutoSlide = () => {
    if (autoSlideIntervalRef.current !== null) {
      window.clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
  };

  const startAutoSlide = () => {
    clearAutoSlide();

    autoSlideIntervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
      beginTransition();
    }, autoSlideMs);
  };

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    setActiveIndex(nextIndex);
    beginTransition();
    startAutoSlide();
  };

  const shiftSlide = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + totalSlides) % totalSlides);
    beginTransition();
    startAutoSlide();
  };

  const goToPrevious = () => {
    shiftSlide(-1);
  };

  const goToNext = () => {
    shiftSlide(1);
  };

  useEffect(() => {
    startAutoSlide();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearAutoSlide();
      window.removeEventListener("keydown", handleKeyDown);

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [totalSlides]);

  return (
    <section
      id="home"
      aria-label="Hero destinations slider"
      className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedData={() => setIsVideoReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/hero-background-15s.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,15,30,0.30),rgba(5,15,30,0.15),rgba(5,15,30,0.05))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_right,rgba(14,165,233,0.08),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.98fr)] lg:items-center lg:gap-10 xl:gap-14">
          <div
            className={`relative z-10 max-w-2xl transition-all duration-500 ease-out ${
              isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100 shadow-lg shadow-sky-500/10 backdrop-blur-xl sm:text-sm">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-100">
                Premium island journeys
              </span>
              <span className="hidden sm:inline">Trusted by travelers</span>
            </div>

            <div className="mt-7 flex items-center gap-4 text-sm text-slate-200/90">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                {String(activeIndex + 1).padStart(2, "0")}
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

            <p className="mt-5 text-sm font-medium uppercase tracking-[0.24em] text-sky-100/90">
              {activeSlide.route}
            </p>

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
                { value: "24/7", label: "Travel support" },
                { value: "5+", label: "Years of service" },
                { value: "Island", label: "Wide coverage" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 shadow-xl shadow-black/10 backdrop-blur-xl"
                >
                  <dt className="text-2xl font-semibold text-white">{item.value}</dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-300">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[420px] overflow-visible sm:min-h-[520px] lg:min-h-[640px]">
            <div className="absolute left-2 top-8 h-64 w-64 rounded-full bg-sky-400/18 blur-3xl motion-safe:animate-pulse sm:left-4 sm:h-72 sm:w-72" />
            <div className="absolute right-2 top-24 h-56 w-56 rounded-full bg-blue-500/18 blur-3xl motion-safe:animate-pulse motion-safe:[animation-delay:1s] sm:right-4 sm:h-64 sm:w-64" />

            <div className="relative h-full min-h-[420px] overflow-visible sm:min-h-[520px] lg:min-h-[640px]">
              {stackedSlides.map(({ slide, offset }) => {
                const isActiveCard = offset === 0;

                return (
                  <article
                    key={slide.id}
                    className={`absolute overflow-hidden rounded-[30px] border border-white/14 bg-white/10 shadow-[0_24px_70px_rgba(8,15,35,0.26)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${stackCardLayouts[offset]}`}
                    aria-hidden={!isActiveCard}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        priority={offset === 0}
                        quality={95}
                        sizes={isActiveCard ? "(min-width: 1280px) 432px, (min-width: 1024px) 400px, (min-width: 640px) 344px, 74vw" : "(min-width: 1280px) 176px, (min-width: 1024px) 168px, 140px"}
                        className={`object-cover ${slide.positionClass}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-slate-950/8 to-white/8" />
                    </div>

                    <div className="absolute inset-0 border border-white/10 rounded-[30px]" />

                    <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                      <div className={`inline-flex max-w-full items-center rounded-full border border-white/10 bg-slate-950/42 px-4 py-2 backdrop-blur-xl ${isActiveCard ? "" : "px-3 py-1.5"}`}>
                        <p className={`truncate font-semibold text-white ${isActiveCard ? "text-base sm:text-lg" : "text-sm"}`}>
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
                        isActive ? "w-10 bg-sky-400" : "w-2.5 bg-white/30 hover:bg-white/50"
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
        </div>
      </div>
    </section>
  );
}
