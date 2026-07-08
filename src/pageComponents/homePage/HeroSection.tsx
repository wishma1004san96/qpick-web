'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Car, ChevronDown, Compass, Shield } from 'lucide-react';

const backgroundImages = [
  '/assets/images/wda01.jpeg',
  '/assets/images/wda02.jpeg',
  '/assets/images/wda03.jpeg',
  '/assets/images/wda04.jpeg',
];

const HeroSection = () => {
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Respect users who prefer reduced motion.
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scrollToAgency = () => {
    const agencySection = document.querySelector('#agency-section');
    if (agencySection) {
      agencySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[100svh]">
      <div className="absolute inset-0">
        {backgroundImages.map((src, index) => {
          const isActive = index === activeBgIndex;
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            >
              <Image
                src={src}
                alt="Sri Lanka travel"
                fill
                sizes="100vw"
                className={`object-cover transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-[1.06]' : 'scale-100'
                }`}
                priority={index === 0}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-[100svh] flex items-start pt-24 sm:pt-28 lg:pt-0 lg:items-center">
        <div className="container mx-auto px-4 pt-0 pb-12 lg:py-14 xl:py-16 2xl:py-20 [@media(min-width:1024px)_and_(max-width:1279px)]:py-10 [@media(max-height:820px)]:py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 2xl:gap-12 [@media(min-width:1024px)_and_(max-width:1279px)]:gap-8 [@media(max-height:820px)]:gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 2xl:px-5 2xl:py-2.5 [@media(max-height:820px)]:py-1.5 text-white">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/30">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-sm 2xl:text-base [@media(min-width:1024px)_and_(max-width:1279px)]:text-xs font-medium tracking-wide">Airport pickups • Chauffeur tours • Custom routes</span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl [@media(min-width:1024px)_and_(max-width:1279px)]:mt-4 [@media(min-width:1024px)_and_(max-width:1279px)]:text-4xl [@media(max-height:820px)]:mt-4 [@media(max-height:820px)]:text-4xl font-bold text-white font-display leading-tight">
                Plan less.
                <span className="block">Explore Sri Lanka more.</span>
              </h1>

              <p className="mt-5 text-lg xl:text-xl [@media(min-width:1024px)_and_(max-width:1279px)]:mt-4 [@media(min-width:1024px)_and_(max-width:1279px)]:text-base [@media(max-height:820px)]:mt-4 [@media(max-height:820px)]:text-base text-gray-100/95 max-w-2xl 2xl:max-w-3xl leading-relaxed">
                A modern travel experience powered by trusted local chauffeurs—built for comfort, safety, and flexible itineraries.
              </p>

              <div className="mt-8 2xl:mt-10 [@media(min-width:1024px)_and_(max-width:1279px)]:mt-6 [@media(max-height:820px)]:mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={scrollToAgency}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-dark text-white px-7 py-3 2xl:px-8 2xl:py-3.5 [@media(min-width:1024px)_and_(max-width:1279px)]:px-6 [@media(min-width:1024px)_and_(max-width:1279px)]:py-2.5 [@media(max-height:820px)]:px-6 [@media(max-height:820px)]:py-2.5 font-medium transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </button>

                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white px-7 py-3 2xl:px-8 2xl:py-3.5 [@media(min-width:1024px)_and_(max-width:1279px)]:px-6 [@media(min-width:1024px)_and_(max-width:1279px)]:py-2.5 [@media(max-height:820px)]:px-6 [@media(max-height:820px)]:py-2.5 font-medium border border-white/15 transition-transform hover:scale-[1.02]"
                >
                  View Vehicles
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="mt-10 2xl:mt-12 [@media(min-width:1024px)_and_(max-width:1279px)]:mt-8 [@media(max-height:820px)]:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-4 max-w-2xl 2xl:max-w-3xl">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 2xl:p-5 [@media(min-width:1024px)_and_(max-width:1279px)]:p-3.5 [@media(max-height:820px)]:p-3.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Shield className="w-5 h-5 text-accent" />
                    Safety first
                  </div>
                  <div className="text-xs 2xl:text-sm [@media(max-height:820px)]:text-[11px] text-gray-100/80 mt-1 [@media(max-height:820px)]:mt-0.5">Licensed chauffeurs, reliable support</div>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 2xl:p-5 [@media(min-width:1024px)_and_(max-width:1279px)]:p-3.5 [@media(max-height:820px)]:p-3.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Car className="w-5 h-5 text-accent" />
                    Comfort rides
                  </div>
                  <div className="text-xs 2xl:text-sm [@media(max-height:820px)]:text-[11px] text-gray-100/80 mt-1 [@media(max-height:820px)]:mt-0.5">Modern vehicles for any group size</div>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 2xl:p-5 [@media(min-width:1024px)_and_(max-width:1279px)]:p-3.5 [@media(max-height:820px)]:p-3.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Compass className="w-5 h-5 text-accent" />
                    Custom routes
                  </div>
                  <div className="text-xs 2xl:text-sm [@media(max-height:820px)]:text-[11px] text-gray-100/80 mt-1 [@media(max-height:820px)]:mt-0.5">Beaches, hills, wildlife, heritage</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl [@media(min-width:1024px)_and_(max-width:1279px)]:scale-[0.92] [@media(max-height:820px)]:scale-[0.86] origin-center lg:ml-auto">
                <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 via-accent/10 to-transparent blur-2xl" />

                <div className="relative grid grid-cols-12 gap-4">
                  <div className="col-span-7">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-white/5">
                      <Image
                        src="/assets/images/wda04.jpeg"
                        alt="Sri Lanka experience"
                        fill
                        sizes="(max-width: 1024px) 100vw, 520px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    </div>
                  </div>

                  <div className="col-span-5 flex flex-col gap-4">
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/15 bg-white/5">
                      <Image
                        src="/assets/images/wda10.jpeg"
                        alt="Culture"
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover"
                      />
                    </div>

                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-white/5">
                      <Image
                        src="/assets/images/wda06.jpeg"
                        alt="Nature"
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="absolute -left-3 -bottom-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3">
                    <div className="text-white font-semibold text-sm">Fast booking • Flexible plans</div>
                    <div className="text-gray-100/80 text-xs mt-1">Designed for real travel days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToAgency}
        className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 inline-flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
