'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Car,
  CheckCircle2,
  CircleDot,
  Clock3,
  Map,
  MapPin,
  Navigation,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

import AnimatedSection from '@/components/AnimatedSection';

const passengerFeatures = [
  'Book Rides Instantly',
  'Airport Transfers',
  'Chauffeur Tours',
  'Live Driver Tracking',
  'Secure Payments',
  'Trip History',
];

const driverFeatures = [
  'Accept Ride Requests',
  'Accept Tour Bookings',
  'Online / Offline Mode',
  'Live Navigation',
  'Daily Earnings',
  'Driver Dashboard',
];

function PhoneMockup({ type }: { type: 'android' | 'ios' }) {
  const isAndroid = type === 'android';

  return (
    <div className="relative mx-auto w-[220px] sm:w-[235px]">
      <div className="pointer-events-none absolute -inset-8 rounded-[2.8rem] bg-gradient-to-b from-primary/20 via-sky-300/10 to-transparent blur-3xl" />

      <div
        className={`relative ${
          isAndroid ? 'motion-safe:animate-[hero-float_6.2s_ease-in-out_infinite]' : 'motion-safe:animate-[hero-float-reverse_6.8s_ease-in-out_infinite]'
        }`}
      >
        <div className="pointer-events-none absolute -left-1.5 top-16 h-12 w-1 rounded-full bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-sm dark:from-zinc-700 dark:to-zinc-500" />
        <div className="pointer-events-none absolute -right-1.5 top-14 h-10 w-1 rounded-full bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-sm dark:from-zinc-700 dark:to-zinc-500" />
        <div className="pointer-events-none absolute -right-1.5 top-28 h-16 w-1 rounded-full bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-sm dark:from-zinc-700 dark:to-zinc-500" />

        <div
          className={`relative overflow-hidden rounded-[2.35rem] border p-[6px] shadow-[0_40px_90px_rgba(2,8,23,0.45)] ${
            isAndroid
              ? 'border-zinc-500/70 bg-[linear-gradient(145deg,#1a1f28,#06080c_45%,#0f1319_70%,#1f2530)]'
              : 'border-zinc-400/70 bg-[linear-gradient(145deg,#4d535f,#1f232b_45%,#2d333e_70%,#666d79)]'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.22),transparent_30%,transparent_70%,rgba(255,255,255,0.08))]" />

          <div className="relative overflow-hidden rounded-[1.95rem] border border-black/60 bg-black">
            {isAndroid ? (
              <>
                <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-3 w-3 -translate-x-1/2 rounded-full border border-black/60 bg-zinc-900 shadow-inner shadow-black/80" />
                <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-700" />
              </>
            ) : (
              <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black/90" />
            )}

            <div className="relative min-h-[430px] overflow-hidden bg-slate-950">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A5D95_0%,#0B73B8_50%,#0A8BC9_100%)]" />
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(255,255,255,0.25), transparent 28%), radial-gradient(circle at 15% 78%, rgba(255,255,255,0.15), transparent 24%)' }} />

              <div className="relative z-10 px-3 pb-3 pt-9">
                <div className="flex items-center justify-between text-[10px] font-medium text-white/90">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    <span>5G</span>
                  </div>
                </div>

                <div className="mt-2 rounded-xl border border-white/25 bg-white/15 px-2.5 py-2 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CircleDot className="h-3.5 w-3.5 text-white" />
                      <span className="text-[10px] font-semibold text-white">Q Pick</span>
                    </div>
                    <span className="text-[10px] font-medium text-white/90">{isAndroid ? 'Passenger' : 'Driver'}</span>
                  </div>
                </div>

                {isAndroid ? (
                  <>
                    <div className="mt-3 overflow-hidden rounded-xl border border-white/20 bg-white/85 shadow-xl">
                      <div className="relative h-28 w-full">
                        <Image
                          src="/images/hero/sigiriya.webp"
                          alt="Q Pick passenger app trip preview"
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 rounded-lg border border-white/30 bg-white/85 px-2 py-1 text-[9px] font-semibold text-slate-700">
                          Airport Pickup · ETA 6 min
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {['Ride', 'Tours', 'Payments', 'History'].map((item) => (
                        <div key={item} className="rounded-lg border border-white/25 bg-white/18 px-2 py-1.5 text-center text-[10px] font-medium text-white backdrop-blur">
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2.5 rounded-xl border border-white/25 bg-white/18 p-2.5 backdrop-blur">
                      <div className="flex items-center justify-between text-[10px] text-white">
                        <span className="font-medium">Live Driver Tracking</span>
                        <Navigation className="h-3.5 w-3.5" />
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/25">
                        <div className="h-full w-2/3 rounded-full bg-emerald-300" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3 rounded-xl border border-white/20 bg-white/85 p-2.5 shadow-xl">
                      <div className="flex items-center justify-between text-[10px] text-slate-700">
                        <span className="font-semibold">Online</span>
                        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">Active</span>
                      </div>
                      <div className="relative mt-2 h-20 overflow-hidden rounded-lg border border-slate-200">
                        <Image
                          src="/images/hero/dalanda-maligawa.webp"
                          alt="Q Pick driver app route preview"
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-1.5 text-[9px] text-slate-600">New Ride: Colombo Airport to Kandy</p>
                    </div>

                    <div className="mt-2.5 rounded-xl border border-white/25 bg-white/18 p-2.5 backdrop-blur">
                      <div className="flex items-center justify-between text-[10px] text-white">
                        <span>Daily Earnings</span>
                        <span className="font-semibold">LKR 18,500</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/25">
                        <div className="h-full w-4/5 rounded-full bg-emerald-300" />
                      </div>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {['Requests', 'Tours', 'Map', 'Wallet'].map((item) => (
                        <div key={item} className="rounded-lg border border-white/25 bg-white/18 px-2 py-1.5 text-center text-[10px] font-medium text-white backdrop-blur">
                          {item}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.2),transparent_24%,transparent_72%,rgba(255,255,255,0.12))] opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type AppCardConfig = {
  type: 'android' | 'ios';
  label: 'Passenger' | 'Driver';
  title: string;
  cta: string;
  features: string[];
  IconPrimary: LucideIcon;
  IconSecondary: LucideIcon;
  iconWrapClass: string;
  sparkleClass: string;
  borderGlowClass: string;
  panelBgClass: string;
};

const appCards: AppCardConfig[] = [
  {
    type: 'android',
    label: 'Passenger',
    title: 'Passenger App',
    cta: 'Download App',
    features: passengerFeatures,
    IconPrimary: Smartphone,
    IconSecondary: MapPin,
    iconWrapClass:
      'bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 shadow-[0_14px_34px_rgba(37,99,235,0.32)]',
    sparkleClass:
      'text-sky-500/70 group-hover:rotate-12 group-hover:text-sky-500 dark:text-sky-300/80',
    borderGlowClass: 'border-sky-300/30 dark:border-sky-300/35',
    panelBgClass:
      'bg-gradient-to-br from-white/85 via-sky-50/80 to-blue-100/75 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08)_58%,rgba(14,165,233,0.2))]',
  },
  {
    type: 'ios',
    label: 'Driver',
    title: 'Driver App',
    cta: 'Become a Driver',
    features: driverFeatures,
    IconPrimary: Car,
    IconSecondary: Map,
    iconWrapClass:
      'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 shadow-[0_14px_34px_rgba(14,116,144,0.32)]',
    sparkleClass:
      'text-cyan-500/70 group-hover:-rotate-12 group-hover:text-cyan-500 dark:text-cyan-300/80',
    borderGlowClass: 'border-cyan-300/30 dark:border-cyan-300/35',
    panelBgClass:
      'bg-gradient-to-br from-white/85 via-blue-50/80 to-cyan-100/75 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08)_58%,rgba(14,165,233,0.2))]',
  },
];

function AppShowcaseCard({
  type,
  label,
  title,
  cta,
  features,
  IconPrimary,
  IconSecondary,
  iconWrapClass,
  sparkleClass,
  borderGlowClass,
  panelBgClass,
}: AppCardConfig) {
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-[1.65rem] border border-white/45 p-6 shadow-[0_30px_78px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_38px_94px_rgba(15,23,42,0.2)] dark:border-white/10 dark:shadow-[0_26px_74px_rgba(2,8,23,0.38)] ${panelBgClass}`}
    >
      <div className={`pointer-events-none absolute inset-0 rounded-[1.6rem] border opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${borderGlowClass}`} aria-hidden />

      <div className="grid h-full w-full grid-cols-1 items-center gap-6 md:grid-cols-[minmax(190px,38%)_minmax(0,62%)] lg:grid-cols-[minmax(205px,38%)_minmax(0,62%)]">
        <div className="relative flex w-full justify-center md:justify-start">
          <PhoneMockup type={type} />
          <div className="pointer-events-none absolute right-0 top-4 rounded-full border border-white/35 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-sky-200">
            {label}
          </div>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white transition duration-500 group-hover:brightness-110 ${iconWrapClass}`}>
              <div className="flex items-center gap-1">
                <IconPrimary className="h-6 w-6" />
                <IconSecondary className="h-4 w-4 -translate-y-1.5" />
              </div>
            </div>
            <Sparkles className={`h-5 w-5 transition duration-500 ${sparkleClass}`} />
          </div>

          <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>

          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 dark:text-gray-300">
            {features.map((feature) => (
              <li key={feature} className="inline-flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-primary-dark"
            >
              {cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TwoPowerfulApps() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-24">

      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: [
            'radial-gradient(circle at 14% 22%, rgba(0,114,188,0.16), transparent 34%)',
            'radial-gradient(circle at 88% 26%, rgba(56,189,248,0.14), transparent 30%)',
            'radial-gradient(circle at 52% 100%, rgba(14,165,233,0.09), transparent 34%)',
          ].join(', '),
        }}
      />

      <div className="pointer-events-none absolute -left-5 top-16 h-20 w-20 rounded-3xl border border-white/20 bg-white/20 text-primary shadow-xl shadow-sky-300/20 backdrop-blur-xl motion-safe:animate-[hero-float_6s_ease-in-out_infinite] dark:border-white/10 dark:bg-white/10">
        <div className="flex h-full w-full items-center justify-center">
          <Smartphone className="h-9 w-9" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-24 h-16 w-16 rounded-2xl border border-white/25 bg-white/25 text-sky-600 shadow-xl shadow-sky-300/20 backdrop-blur-xl motion-safe:animate-[hero-float-reverse_7s_ease-in-out_infinite] dark:border-white/10 dark:bg-white/10 dark:text-sky-300">
        <div className="flex h-full w-full items-center justify-center">
          <Car className="h-7 w-7" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-20 left-[14%] hidden h-14 w-14 rounded-2xl border border-white/20 bg-white/25 text-emerald-500 shadow-lg shadow-emerald-300/20 backdrop-blur-lg motion-safe:animate-[hero-float_8s_ease-in-out_infinite] lg:block dark:border-white/10 dark:bg-white/10 dark:text-emerald-300">
        <div className="flex h-full w-full items-center justify-center">
          <Wifi className="h-6 w-6" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-6xl">
          <AnimatedSection animation="slide-up">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary-dark dark:bg-white/10 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                <span className="text-sm font-semibold tracking-wide">One Platform. Two Powerful Apps</span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                One Platform. Two Powerful Apps
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Experience seamless travel coordination with dedicated apps for passengers and drivers, built for speed, reliability, and premium service.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-sky-700 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-sky-200">
                  <Smartphone className="h-3.5 w-3.5" /> Passenger
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-cyan-700 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-cyan-200">
                  <Car className="h-3.5 w-3.5" /> Driver
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-emerald-700 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-emerald-200">
                  <Clock3 className="h-3.5 w-3.5" /> Available 24/7
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-indigo-700 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-indigo-200">
                  <ShieldCheck className="h-3.5 w-3.5" /> Trusted Service
                </span>
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {appCards.map((card, index) => (
              <AnimatedSection key={card.title} animation="slide-up" delay={100 + index * 100} className="h-full">
                <AppShowcaseCard {...card} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="slide-up" delay={300}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <div className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-[0_14px_34px_rgba(15,23,42,0.1)] transition-transform duration-300 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:shadow-black/35">
                <FaGooglePlay className="h-5 w-5 text-primary" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">Get it on</span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </div>

              <div className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-[0_14px_34px_rgba(15,23,42,0.1)] backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:shadow-black/35">
                <FaApple className="h-5 w-5 text-primary" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold">App Store</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary dark:bg-white/10 dark:text-sky-200">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
