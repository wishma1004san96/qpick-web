"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/heroSlides";

const transitionMs = 700;
const autoSlideMs = 6000;

/**
 * Slot-based card positions. When activeIndex changes, each slide is assigned
 * a slot via (slideIdx - activeIndex + total) % total. Because inline styles
 * change and transition-all is applied, cards physically move between positions.
 *
 * Slot 0 = front large card (visible)
 * Slot 1 = middle card    (visible)
 * Slot 2 = back card      (visible, slightly faded)
 * Slot 3 = off-screen right, opacity 0  (smooth enter/exit zone)
 * Slot 4+ = far off-screen, no transition (instant reset)
 */
type SlotConfig = {
  left: string;
  top: string;
  zIndex: number;
  opacity: number;
  width: string;
  height: string;
};

const SLOT_CONFIG: SlotConfig[] = [
  // 0: front active card
  { left: "0%",   top: "0px",  zIndex: 40, opacity: 1,    width: "clamp(13rem,14.5vw,17rem)",  height: "clamp(300px,32vw,520px)" },
  // 1: middle card — slightly lower, narrower
  { left: "47%",  top: "56px", zIndex: 30, opacity: 1,    width: "clamp(9.5rem,10.5vw,12rem)", height: "clamp(195px,21vw,350px)" },
  // 2: back card — partially off right edge
  { left: "73%",  top: "38px", zIndex: 20, opacity: 0.9,  width: "clamp(8.5rem,9.5vw,11rem)",  height: "clamp(180px,19vw,325px)" },
  // 3: just off-screen right — enter/exit zone
  { left: "102%", top: "38px", zIndex: 10, opacity: 0,    width: "clamp(8.5rem,9.5vw,11rem)",  height: "clamp(180px,19vw,325px)" },
];

const HIDDEN_SLOT: SlotConfig = {
  left: "130%", top: "38px", zIndex: 0, opacity: 0,
  width: "clamp(8.5rem,9.5vw,11rem)", height: "clamp(180px,19vw,325px)",
};

export default function HeroSlider() {
  const slides = heroSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const autoSlideIntervalRef = useRef<number | null>(null);

  const activeSlide = slides[activeIndex];
  const totalSlides = slides.length;

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
      className="relative isolate overflow-hidden bg-[#07111f] text-white h-[calc(100vh-104px)] sm:h-[calc(100vh-112px)] lg:h-[calc(100vh-118px)]"
    >
      {/* ── Background video with cinematic zoom ── */}
      <video
        className="absolute inset-0 h-full w-full object-cover hero-bg-zoom"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={slides[0]?.image}
        aria-hidden="true"
      >
        <source src="/videos/hero-background-15s.mp4" type="video/mp4" />
      </video>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,8,15,0.93)] via-[rgba(5,8,15,0.58)] to-[rgba(5,8,15,0.06)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030b16]/22 via-transparent to-[#030b16]/74" />

      {/*
        max-w-[100rem] = 1600px cap — prevents content from stretching on ultra-wides.
        Outer px scales with breakpoints for breathing room on every resolution.
      */}
      <div className="relative mx-auto flex h-full w-full max-w-[100rem] items-center px-6 pb-10 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pb-8 lg:pt-10 xl:px-20 2xl:px-28">
        <div className="grid w-full items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.86fr)] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(510px,0.86fr)] xl:gap-8 2xl:grid-cols-[minmax(0,1fr)_minmax(590px,0.86fr)] 2xl:gap-10">
          {/* ── LEFT CONTENT ──
              Nav dots are a flex sibling (not absolute) so they never clip off-screen.
              Left indent scales with breakpoints.
          ── */}
          <div className="flex items-start gap-5 transition-transform lg:translate-y-[clamp(1.9rem,2.6vw,2.5rem)] lg:gap-7 lg:pl-8 lg:-translate-x-[clamp(2.5rem,3.2vw,3.75rem)] xl:pl-12 2xl:pl-16">

            {/* Vertical nav dots + counter — desktop only */}
            <div className="hidden flex-shrink-0 flex-col items-center pt-7 lg:flex">
              <div
                className="relative flex flex-col items-center justify-between"
                style={{ height: "clamp(240px, 22vh, 290px)" }}
              >
                <span
                  className="absolute left-1/2 top-[5px] w-px -translate-x-1/2 bg-white/20"
                  style={{ height: "calc(100% - 10px)" }}
                  aria-hidden="true"
                />
                {slides.map((slide, index) => (
                  <span
                    key={slide.id}
                    className={`relative z-10 h-2.5 w-2.5 flex-shrink-0 rounded-full border border-white/20 transition duration-500 ${
                      index === activeIndex ? "scale-110 bg-white" : "bg-slate-300/40"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-7 text-[0.68rem] font-bold tracking-[0.3em] text-white/65 [writing-mode:vertical-rl]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </p>
            </div>

            {/* Text content */}
            <div
              className={`transition-all duration-[920ms] ease-out ${
                isTransitioning ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              {/* Mobile-only counter */}
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/90 lg:hidden">
                {String(activeIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </p>

              {/* Heading: clamp scales fluidly from 1024px to 2560px */}
              <h1
                className="mt-4 font-black uppercase leading-[0.88] tracking-[0.01em] text-white"
                style={{ fontSize: "clamp(3rem, 5.8vw, 6.75rem)" }}
              >
                {activeSlide.title}
              </h1>

              {/* Paragraph */}
              <p
                className="mt-7 leading-[1.74] text-slate-100/84"
                style={{
                  fontSize: "clamp(0.95rem, 1.05vw, 1.22rem)",
                  maxWidth: "clamp(22rem, 26vw, 36rem)",
                }}
              >
                {activeSlide.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={activeSlide.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-base font-semibold text-white shadow-[0_18px_48px_rgba(37,99,235,0.34)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  {activeSlide.primaryCta.label}
                </Link>

                <Link
                  href={activeSlide.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-white/10 hover:backdrop-blur-md"
                >
                  {activeSlide.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT IMAGE STACK ──
              All slides are rendered. Each slide's slot = (slideIdx - activeIndex + total) % total.
              When activeIndex changes, slot numbers change → inline styles change → CSS transition
              animates the cards physically moving between positions.
          ── */}
          <div className="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[530px] lg:justify-self-end lg:-translate-x-[clamp(2.5rem,3.2vw,3.75rem)] lg:translate-y-[clamp(4.5rem,6vw,6.25rem)] xl:min-h-[570px] 2xl:min-h-[610px]">
            <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[530px] xl:min-h-[570px] 2xl:min-h-[610px] overflow-hidden lg:pl-4 xl:pl-5 2xl:pl-6">
              {slides.map((slide, slideIdx) => {
                const slot = (slideIdx - activeIndex + totalSlides) % totalSlides;
                const config = slot < SLOT_CONFIG.length ? SLOT_CONFIG[slot] : HIDDEN_SLOT;
                const animated = slot < SLOT_CONFIG.length;
                const isActiveCard = slot === 0;
                const floatClass = slot === 0 ? "hero-card-float-a" : slot === 1 ? "hero-card-float-b" : "";

                return (
                  <article
                    key={slide.id}
                    aria-hidden={!isActiveCard}
                    style={{
                      position: "absolute",
                      left: config.left,
                      top: config.top,
                      width: config.width,
                      height: config.height,
                      opacity: config.opacity,
                      zIndex: config.zIndex,
                    }}
                    className={`overflow-hidden rounded-[26px] border border-white/15 bg-white/[0.06] shadow-[0_36px_100px_rgba(2,8,22,0.60)] backdrop-blur-xl ${floatClass} ${
                      animated
                        ? "transition-[left,top,width,height,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        : "transition-none"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      quality={isActiveCard ? 100 : 92}
                      priority={slideIdx === 0}
                      sizes="(min-width: 1536px) 560px, (min-width: 1280px) 500px, (min-width: 1024px) 440px, 74vw"
                      className={`object-cover ${slide.positionClass}`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/56 via-[#07111f]/14 to-transparent" />

                    <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                      <div className="inline-flex max-w-full items-center rounded-full border border-white/12 bg-slate-950/46 px-4 py-2 backdrop-blur-xl">
                        <p className={`truncate font-semibold text-white ${isActiveCard ? "text-base sm:text-lg" : "text-sm"}`}>
                          {slide.title}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ── BOTTOM ROW — watermark + slide indicators ──
              Left padding matches the left-content flex indent
              so the watermark aligns with the heading.
          ── */}
          <div className="col-span-full mt-1 grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:pl-8 xl:pl-12 2xl:pl-16">
            <p
              className="font-semibold text-white/[0.13]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 7rem)" }}
            >
              {activeSlide.title}
            </p>

            <div className="flex items-center justify-end gap-3 lg:justify-self-end">
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
                        isActive ? "w-10 bg-white" : "w-2.5 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Center-bottom prev/next arrows ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 hidden justify-center lg:flex">
          <div className="pointer-events-auto flex items-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous slide"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <span aria-hidden="true" className="text-xl leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next slide"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <span aria-hidden="true" className="text-xl leading-none">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
