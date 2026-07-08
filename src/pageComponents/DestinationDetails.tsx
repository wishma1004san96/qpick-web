'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Route,
  Sparkles,
  X,
} from 'lucide-react';

import { tours } from '@/data/tours';

export type DestinationDetailsData = {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  heroImage?: string;
  category?: string;
  duration?: string;
  bestTime?: string;
  coordinates?: { lat: number; lng: number };
  gallery?: Array<{ image: string; title?: string; description?: string }>;
  highlights?: string[];
  highlightsDetailed?: Array<{ title: string; description?: string; coordinates?: { lat: number; lng: number } }>;
  experiences?: string[];
  practicalInfo?: {
    duration?: string;
    bestTime?: string;
    gettingThere?: string;
    accommodation?: string;
    transport?: string;
  };
  nearbyDestinations?: Array<{ name: string; distance?: string; description?: string }>;
  tips?: string[];
};

type LightboxImage = { id: string; src: string; alt: string };

import HighlightMapClient from '@/components/highlight-map-client';
import type { HighlightPoint } from '@/lib/highlights-cache';
interface LightboxProps {
  images: LightboxImage[];
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
          aria-label="Destination image viewer"
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
                alt={active.alt}
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
                    <Image src={img.src} alt={img.alt} fill sizes="96px" className="object-cover" />
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

export default function DestinationDetails({ destination, highlightsData }: { destination: DestinationDetailsData, highlightsData: { points: HighlightPoint[] } | null }) {
  const heroSrc = destination.heroImage || destination.image || '';

  const slugifyTourTitle = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const images = useMemo<LightboxImage[]>(() => {
    const gallery = destination.gallery || [];
    return gallery
      .filter((g) => Boolean(g.image))
      .map((g, idx) => ({
        id: `${destination.slug}-${idx}`,
        src: g.image,
        alt: g.title || destination.name,
      }));
  }, [destination.gallery, destination.name, destination.slug]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = useMemo(
    () =>
      [
        { key: 'about' as const, label: 'About', enabled: true },
        { key: 'gallery' as const, label: 'Gallery', enabled: images.length > 0 },
        {
          key: 'highlights' as const,
          label: 'Highlights & Tips',
          enabled: Boolean(destination.highlightsDetailed?.length || destination.tips?.length),
        },
        { key: 'experiences' as const, label: 'Experiences', enabled: Boolean(destination.experiences?.length) },
      ].filter((t) => t.enabled),
    [destination.experiences?.length, destination.highlightsDetailed?.length, destination.tips?.length, images.length]
  );

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('about');

  const [stickyTopPx, setStickyTopPx] = useState<number>(80);
  const tabsSentinelRef = useRef<HTMLDivElement | null>(null);
  const tabsBarRef = useRef<HTMLDivElement | null>(null);
  const [tabsBarHeightPx, setTabsBarHeightPx] = useState<number>(0);
  const [isTabsPinned, setIsTabsPinned] = useState<boolean>(false);



  const highlightItems = useMemo(
    () => (destination.highlightsDetailed ?? []).slice(0, 6),
    [destination.highlightsDetailed]
  );

  const [activeHighlightTitle, setActiveHighlightTitle] = useState<string | null>(null);
  const highlightCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastOpenedPopupTitleRef = useRef<string | null>(null);






  useEffect(() => {
    let rafId: number | null = null;

    const compute = () => {
      const headerEl = document.querySelector('nav');
      const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;
      setStickyTopPx(Math.max(0, Math.ceil(headerHeight)));

      const sentinelTop = tabsSentinelRef.current?.getBoundingClientRect().top ?? Infinity;
      setIsTabsPinned(sentinelTop <= headerHeight);

      const barHeight = tabsBarRef.current?.getBoundingClientRect().height ?? 0;
      setTabsBarHeightPx(Math.max(0, Math.ceil(barHeight)));
    };

    const scheduleCompute = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        compute();
      });
    };

    compute();
    window.addEventListener('resize', scheduleCompute);
    window.addEventListener('scroll', scheduleCompute, { passive: true });

    return () => {
      window.removeEventListener('resize', scheduleCompute);
      window.removeEventListener('scroll', scheduleCompute);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!tabs.length) return;
    if (!tabs.some((t) => t.key === activeTab)) {
      setActiveTab(tabs[0].key);
    }
  }, [activeTab, tabs]);

  const scrollToContentTop = () => {
    if (!tabsSentinelRef.current) return;

    const rect = tabsSentinelRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;

    window.scrollTo({
      top: Math.max(0, absoluteTop - stickyTopPx),
      behavior: 'smooth',
    });
  };

  const openHighlightOnMap = async (title: string) => {
    // This function handled opening a leaflet popup.
    // The Google map wrapper handles popups internally on marker click.
    // If you need programmatic popup opening, you would pass a state down to HighlightMapClient.
    // For now, we just let the user click the markers.
    lastOpenedPopupTitleRef.current = title;
  };

  const selectHighlight = (title: string, options?: { scrollToCard?: boolean }) => {
    setActiveHighlightTitle(title);

    if (options?.scrollToCard) {
      const el = highlightCardRefs.current[title];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    void openHighlightOnMap(title);
  };

  const relatedTours = useMemo(
    () => tours.filter((tour) => tour.destinations?.includes(destination.slug)),
    [destination.slug]
  );

  const quickFacts = useMemo(
    () =>
      [
        destination.category ? { label: 'Category', value: destination.category, icon: MapPin } : null,
        destination.bestTime ? { label: 'Best time', value: destination.bestTime, icon: Calendar } : null,
        destination.duration ? { label: 'Duration', value: destination.duration, icon: Clock } : null,
      ].filter(Boolean) as Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }>,
    [destination.bestTime, destination.category, destination.duration]
  );

  return (
    <main className="bg-[#F8F9FA] dark:bg-[#0B1120]">
      <section className="relative overflow-hidden min-h-[75svh]">
        <div className="absolute inset-0" aria-hidden>
          {heroSrc ? (
            <Image
              src={heroSrc}
              alt={destination.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#2C3E50]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-[#0B1120] dark:to-[#0B1120]" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/35 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 lg:pb-14">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                  <li>
                    <Link href="/" className="hover:text-white transition cursor-pointer">
                      Home
                    </Link>
                  </li>
                  <li className="text-white/40">/</li>
                  <li>
                    <Link href="/destinations" className="hover:text-white transition cursor-pointer">
                      Destinations
                    </Link>
                  </li>
                  <li className="text-white/40">/</li>
                  <li className="text-white font-medium">{destination.name}</li>
                </ol>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <Route className="w-4 h-4" />
                    Explore Sri Lanka
                  </div>

                  <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.02] [text-wrap:balance]">
                    {destination.name}
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                    {destination.subtitle || destination.shortDescription || 'Explore this destination'}
                  </p>

                  {quickFacts.length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {quickFacts.map((fact) => {
                        const Icon = fact.icon;
                        return (
                          <div
                            key={fact.label}
                            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 text-white"
                          >
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                              <Icon className="w-5 h-5" />
                            </span>
                            <div className="leading-tight">
                              <div className="text-xs text-white/70">{fact.label}</div>
                              <div className="text-sm font-semibold">{fact.value}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/tours"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white px-6 py-4 font-semibold transition cursor-pointer"
                    >
                      View Tours
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white px-6 py-4 font-semibold transition cursor-pointer"
                    >
                      Contact Us
                      <MessageCircle className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/destinations"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/0 hover:bg-white/10 border border-white/15 text-white/90 px-6 py-4 font-semibold transition cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      All destinations
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div ref={tabsSentinelRef} aria-hidden />
        <div
          ref={tabsBarRef}
          className={
            `z-40 border-b border-[#E9ECEF] dark:border-gray-800 bg-[#F8F9FA]/90 dark:bg-[#0B1120]/85 backdrop-blur shadow-sm ` +
            (isTabsPinned ? 'fixed left-0 right-0' : 'relative')
          }
          style={isTabsPinned ? { top: stickyTopPx } : undefined}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 py-3 overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      scrollToContentTop();
                    }}
                    className={
                      `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ` +
                      (isActive
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-[#1C2537]/50 border border-[#E9ECEF] dark:border-gray-800 text-[#2C3E50] dark:text-white hover:border-primary/40')
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {isTabsPinned ? <div aria-hidden style={{ height: tabsBarHeightPx }} /> : null}

        <div className="container mx-auto px-4 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              {activeTab === 'about' ? (
                <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <h2 className="text-xl font-bold text-[#2C3E50] dark:text-white">About {destination.name}</h2>

                  {destination.description ? (
                    <div className="mt-4 prose prose-slate dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{destination.description}</ReactMarkdown>
                    </div>
                  ) : destination.shortDescription ? (
                    <p className="mt-4 text-[#495057] dark:text-gray-300 leading-relaxed">{destination.shortDescription}</p>
                  ) : (
                    <p className="mt-4 text-[#6C757D] dark:text-gray-400">Details coming soon.</p>
                  )}
                </div>
              ) : null}

              {activeTab === 'gallery' && images.length ? (
                <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Gallery</h2>
                    <span className="text-sm text-[#6C757D] dark:text-gray-400">Tap to view</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.slice(0, 6).map((img, idx) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="group relative rounded-xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800 bg-black/5 dark:bg-black/20 cursor-pointer"
                        aria-label={`Open image ${idx + 1}`}
                      >
                        <div className="relative w-full aspect-[4/3]">
                          <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition" />
                      </button>
                    ))}
                  </div>

                  {images.length > 6 ? (
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(0)}
                      className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:opacity-90 transition cursor-pointer"
                    >
                      View all photos
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>
              ) : null}

              {activeTab === 'highlights' ? (
                <div className="space-y-6">
                  {highlightsData?.points?.length ? (
                    <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Highlights map</h2>
                        <span className="text-sm text-[#6C757D] dark:text-gray-400">Tap markers for details</span>
                      </div>

                      <div className="mt-4 rounded-2xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800">
                        <div className="h-[400px] w-full">
                          <HighlightMapClient points={highlightsData?.points || []} />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {highlightItems.length ? (
                    <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                      <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Top highlights</h2>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {highlightItems.map((h) => {
                          const isActive = activeHighlightTitle === h.title;
                          const isClickable = Boolean(h.coordinates?.lat) && Boolean(h.coordinates?.lng);
                          return (
                          <div
                            key={h.title}
                            ref={(el) => {
                              highlightCardRefs.current[h.title] = el;
                            }}
                            role={isClickable ? 'button' : undefined}
                            tabIndex={isClickable ? 0 : undefined}
                            onClick={isClickable ? () => selectHighlight(h.title) : undefined}
                            onKeyDown={
                              isClickable
                                ? (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      selectHighlight(h.title);
                                    }
                                  }
                                : undefined
                            }
                            className={
                              `rounded-2xl border bg-white/70 dark:bg-[#0B1120]/40 p-4 transition ` +
                              (isActive
                                ? 'border-primary ring-2 ring-primary/25 bg-primary/5'
                                : 'border-[#E9ECEF] dark:border-gray-800') +
                              (isClickable ? ' cursor-pointer hover:border-primary/40' : '')
                            }
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Sparkles className="w-5 h-5" />
                              </span>
                              <div>
                                <h3 className="font-semibold text-[#2C3E50] dark:text-white">{h.title}</h3>
                                {h.description ? (
                                  <p className="mt-1 text-sm text-[#495057] dark:text-gray-300">{h.description}</p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {destination.tips?.length ? (
                    <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                      <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Local tips</h2>
                      <ul className="mt-4 space-y-2 text-sm text-[#495057] dark:text-gray-300">
                        {destination.tips.slice(0, 10).map((t) => (
                          <li key={t} className="flex items-start gap-2">
                            <span className="mt-1 text-primary">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {activeTab === 'experiences' && destination.experiences?.length ? (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Experiences</h2>
                    <ul className="mt-4 space-y-2 text-sm text-[#495057] dark:text-gray-300">
                      {destination.experiences.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {destination.practicalInfo?.gettingThere ||
                  destination.practicalInfo?.accommodation ||
                  destination.practicalInfo?.transport ||
                  destination.practicalInfo?.bestTime ||
                  destination.practicalInfo?.duration ? (
                    <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                      <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Practical info</h2>

                      <div className="mt-4 space-y-3 text-sm text-[#495057] dark:text-gray-300">
                        {destination.practicalInfo?.bestTime ? (
                          <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                            <div className="font-semibold text-[#2C3E50] dark:text-white">Best time to visit</div>
                            <div className="mt-1">{destination.practicalInfo.bestTime}</div>
                          </div>
                        ) : null}

                        {destination.practicalInfo?.duration ? (
                          <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                            <div className="font-semibold text-[#2C3E50] dark:text-white">Suggested duration</div>
                            <div className="mt-1">{destination.practicalInfo.duration}</div>
                          </div>
                        ) : null}

                        {destination.practicalInfo?.gettingThere ? (
                          <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                            <div className="font-semibold text-[#2C3E50] dark:text-white">Getting there</div>
                            <div className="mt-1">{destination.practicalInfo.gettingThere}</div>
                          </div>
                        ) : null}

                        {destination.practicalInfo?.transport ? (
                          <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                            <div className="font-semibold text-[#2C3E50] dark:text-white">Transport</div>
                            <div className="mt-1">{destination.practicalInfo.transport}</div>
                          </div>
                        ) : null}

                        {destination.practicalInfo?.accommodation ? (
                          <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                            <div className="font-semibold text-[#2C3E50] dark:text-white">Where to stay</div>
                            <div className="mt-1">{destination.practicalInfo.accommodation}</div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {relatedTours.length ? (
                  <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Related tours</h2>
                    <p className="mt-2 text-sm text-[#6C757D] dark:text-gray-400">
                      Tours that include {destination.name}.
                    </p>

                    <div className="mt-4 space-y-2">
                      {relatedTours.slice(0, 6).map((tour) => (
                        <Link
                          key={tour.title}
                          href={`/tours/${encodeURIComponent(slugifyTourTitle(tour.title))}`}
                          className="group flex items-start justify-between gap-3 rounded-xl border border-[#E9ECEF] dark:border-gray-800 bg-white/70 dark:bg-[#0B1120]/40 p-4 hover:border-primary/40 transition cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-[#2C3E50] dark:text-white group-hover:text-primary transition-colors">
                              {tour.title}
                            </div>
                            <div className="mt-1 text-xs text-[#6C757D] dark:text-gray-400">{tour.duration}</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-[#6C757D] dark:text-gray-400 shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>

                    {relatedTours.length > 6 ? (
                      <div className="mt-4 text-xs text-[#6C757D] dark:text-gray-400">
                        + {relatedTours.length - 6} more tours
                      </div>
                    ) : null}

                    <Link
                      href="/tours"
                      className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:opacity-90 transition cursor-pointer"
                    >
                      View all tours
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : null}

                {destination.nearbyDestinations?.length ? (
                  <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Nearby places</h2>
                    <div className="mt-4 space-y-3">
                      {destination.nearbyDestinations.slice(0, 6).map((n) => (
                        <div key={n.name} className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-semibold text-[#2C3E50] dark:text-white">{n.name}</div>
                              {n.description ? (
                                <div className="mt-1 text-sm text-[#495057] dark:text-gray-300">{n.description}</div>
                              ) : null}
                            </div>
                            {n.distance ? (
                              <span className="shrink-0 text-xs font-semibold rounded-full bg-primary/10 text-primary px-3 py-1">
                                {n.distance}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Plan your trip</h2>

                  <div className="mt-4 space-y-3 text-sm text-[#495057] dark:text-gray-300">
                    {destination.practicalInfo?.gettingThere ? (
                      <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                        <div className="font-semibold text-[#2C3E50] dark:text-white">Getting there</div>
                        <div className="mt-1">{destination.practicalInfo.gettingThere}</div>
                      </div>
                    ) : null}

                    {destination.practicalInfo?.accommodation ? (
                      <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                        <div className="font-semibold text-[#2C3E50] dark:text-white">Where to stay</div>
                        <div className="mt-1">{destination.practicalInfo.accommodation}</div>
                      </div>
                    ) : null}

                    {destination.practicalInfo?.transport ? (
                      <div className="rounded-xl border border-[#E9ECEF] dark:border-gray-800 p-4">
                        <div className="font-semibold text-[#2C3E50] dark:text-white">Transport</div>
                        <div className="mt-1">{destination.practicalInfo.transport}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Next steps</h2>
                  <p className="mt-2 text-sm text-[#6C757D] dark:text-gray-400">
                    Continue planning with tours, or reach us directly.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <Link
                      href="/tours"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white px-5 py-4 font-semibold transition cursor-pointer"
                    >
                      View Tours
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-[#0B1120]/40 hover:bg-[#F1F3F5] dark:hover:bg-[#0B1120]/60 border border-[#E9ECEF] dark:border-gray-800 text-[#2C3E50] dark:text-white px-5 py-4 font-semibold transition cursor-pointer"
                    >
                      Contact Us
                      <MessageCircle className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && images.length ? (
        <Lightbox
          images={images}
          activeIndex={lightboxIndex}
          onChangeIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </main>
  );
}
