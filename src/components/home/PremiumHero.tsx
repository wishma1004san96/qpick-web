'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

import HeroSlider from './HeroSlider';

const quickStats = [
  { value: '24/7', label: 'Concierge support' },
  { value: '100+', label: 'Premium itineraries' },
  { value: '5-star', label: 'Travel experience' },
];

export default function PremiumHero() {
  return (
    <section
      id="home"
      aria-label="Q Pick premium hero"
      className="relative isolate overflow-hidden bg-slate-950 text-white"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/videos/hero-background-15s.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.18),transparent_28%),linear-gradient(115deg,rgba(2,6,23,0.84)_10%,rgba(2,6,23,0.5)_52%,rgba(2,6,23,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />

      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl motion-safe:animate-[hero-float_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl motion-safe:animate-[hero-float-reverse_10s_ease-in-out_infinite]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid w-full gap-12 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/12 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-100 shadow-[0_16px_34px_rgba(14,165,233,0.16)] backdrop-blur-2xl sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.9)]" />
              Private Island Atelier
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-slate-200/90">
              <Sparkles className="h-4 w-4 text-sky-300" />
              <span>Every mile feels like a scene you&apos;ll remember for life.</span>
            </div>

            <h1 className="mt-6 max-w-[12.8ch] text-[clamp(2.75rem,6.2vw,5.65rem)] font-semibold leading-[0.93] tracking-[-0.042em] text-white sm:max-w-[13.5ch]">
              Sri Lanka,
              <span className="block bg-gradient-to-r from-sky-300 via-cyan-200 to-white bg-clip-text pb-1 text-transparent">
                Beautifully Yours.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[1.03rem] leading-7 text-slate-200/90 sm:text-[1.08rem]">
              Wake to misty tea hills, dine by the ocean at dusk, and arrive everywhere with a chauffeur who knows the island by heart.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-r from-[#3BA8F8] via-[#1E88E5] to-[#1769C6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(30,136,229,0.42),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:from-[#55B7FF] hover:via-[#2196F3] hover:to-[#1E7DDB] hover:shadow-[0_20px_42px_rgba(30,136,229,0.5),0_0_24px_rgba(59,168,248,0.32)]"
              >
                Begin Your Private Escape
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="#destinations"
                className="group inline-flex items-center justify-center rounded-2xl border border-white/24 bg-white/12 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(2,8,23,0.2)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200/70 hover:bg-white/18 hover:shadow-[0_18px_36px_rgba(30,136,229,0.22)]"
              >
                Browse Signature Journeys
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-slate-950/45 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                >
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-x-10 top-10 h-40 rounded-full bg-sky-400/20 blur-3xl" />
            <HeroSlider compact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
