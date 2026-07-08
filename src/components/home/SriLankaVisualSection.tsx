'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';

const visualMoments = [
  {
    title: 'Sigiriya',
    subtitle: 'Featured Visual',
    destinationLabel: 'Cultural Triangle',
    description: 'A landmark frame with dramatic skies and heritage depth, curated for high-end itineraries.',
    image: '/images/hero/sigiriya.webp',
  },
  {
    title: 'Ella',
    subtitle: 'Tea Country',
    destinationLabel: 'Hill Country',
    description: 'Soft mountain light, tea-lined ridges, and elevated moments designed for visual storytelling.',
    image: '/images/hero/ella-nine-arch-bridge.webp',
  },
  {
    title: 'Mirissa',
    subtitle: 'South Coast',
    destinationLabel: 'Beach Paradise',
    description: 'Golden shores and ocean blues translated into a polished, editorial luxury travel look.',
    image: '/images/hero/mirissa-sri-lanka.webp',
  },
  {
    title: 'Nuwara Eliya',
    subtitle: 'Highlands',
    destinationLabel: 'Tea Estates',
    description: 'A cooler alpine mood with misty greens and colonial charm across Sri Lanka’s tea country.',
    image: '/images/hero/nuwara-eliya-sri-lanka.webp',
  },
  {
    title: 'Nine Arch Bridge',
    subtitle: 'Railway Heritage',
    destinationLabel: 'Scenic Train Journey',
    description: 'A signature rail icon captured with cinematic movement and timeless Sri Lankan character.',
    image: '/assets/images/train.jpeg',
  },
];

const collectionBadges = ['500+ Premium Locations', '4K Photography', 'Sri Lanka Collection'];
const ROTATION_INTERVAL_MS = 5000;
const SIDE_CARD_COUNT = 3;

export default function SriLankaVisualSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeMoment = visualMoments[activeIndex];
  const sideMoments = useMemo(
    () =>
      Array.from({ length: SIDE_CARD_COUNT }, (_, offset) => {
        const index = (activeIndex + offset + 1) % visualMoments.length;
        return { ...visualMoments[index], index };
      }),
    [activeIndex],
  );

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visualMoments.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_82%_26%,rgba(15,118,255,0.06),transparent_30%),radial-gradient(circle_at_52%_100%,rgba(14,165,233,0.06),transparent_30%)] dark:bg-[radial-gradient(circle_at_16%_18%,rgba(56,189,248,0.12),transparent_34%),radial-gradient(circle_at_82%_26%,rgba(15,118,255,0.1),transparent_32%),radial-gradient(circle_at_52%_100%,rgba(14,165,233,0.1),transparent_32%)]" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,1.48fr)] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:border-white/10 dark:bg-white/8 dark:text-sky-200">
              <Camera className="h-3.5 w-3.5" />
              Sri Lanka photography
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl lg:text-[2.7rem] lg:leading-[1.02]">
              Sri Lanka, captured in a luxury editorial frame.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Curated imagery designed to feel immersive, elevated, and deeply cinematic across the island.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {collectionBadges.map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.08 * index }}
                  className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 backdrop-blur-md dark:border-white/12 dark:bg-white/10 dark:text-slate-200"
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-white/70 bg-white/60 p-4 shadow-[0_10px_34px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06]">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-sky-200">
                <Sparkles className="h-4 w-4" />
                Curated for premium journeys
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Handpicked visuals across coast, highlands, and heritage routes to inspire high-end travel planning.
              </p>
            </div>

            <Link
              href="/gallery"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.75 }}
            className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-[0_28px_86px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-white/[0.06]"
            >
              <motion.div className="relative aspect-[3/4] overflow-hidden rounded-[1.7rem]" whileHover={{ scale: 1.012 }} transition={{ duration: 0.5 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeMoment.image}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeMoment.image}
                      alt={`${activeMoment.title} luxury Sri Lanka travel photography`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/28 to-black/5" />

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`badges-${activeMoment.title}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                    className="absolute left-5 top-5 flex flex-wrap gap-2"
                  >
                    {[activeMoment.title, activeMoment.subtitle, activeMoment.destinationLabel].map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-white/25 bg-black/26 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-xl"
                      >
                        {badge}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`caption-${activeMoment.title}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45 }}
                    className="absolute left-5 bottom-5 right-5 rounded-[1.65rem] border border-white/20 bg-black/24 p-4 backdrop-blur-xl"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-100/70">{activeMoment.subtitle}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{activeMoment.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200/90">{activeMoment.description}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="mt-4 flex items-center justify-center gap-2.5">
                {visualMoments.map((moment, index) => (
                  <button
                    key={moment.title}
                    type="button"
                    aria-label={`Show ${moment.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-7 bg-sky-500 dark:bg-sky-300'
                        : 'w-2.5 bg-slate-300/80 hover:bg-slate-400 dark:bg-white/30 dark:hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              {sideMoments.map((moment, index) => (
                <motion.article
                  key={`${moment.title}-${activeIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 * (index + 1) }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="group relative overflow-hidden rounded-[1.9rem] border border-white/60 bg-white p-3 shadow-[0_24px_72px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(moment.index)}
                    aria-label={`Set featured image to ${moment.title}`}
                    className="block w-full text-left"
                  >
                    <motion.div className="relative aspect-[16/11] overflow-hidden rounded-[1.45rem]" whileHover={{ y: -2 }} transition={{ duration: 0.35 }}>
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        fill
                        sizes="(max-width: 1280px) 100vw, 28vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/66 via-black/20 to-black/5" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-sky-100/75">{moment.destinationLabel}</p>
                        <h4 className="mt-2 text-lg font-semibold text-white sm:text-xl">{moment.title}</h4>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-200/90">{moment.subtitle}</p>
                      </div>
                    </motion.div>
                  </button>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
