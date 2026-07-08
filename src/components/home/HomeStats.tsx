'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CarFront, MapPinned, Plane, ShieldCheck } from 'lucide-react';

const featureItems = [
  {
    title: 'Airport Transfers',
    description: 'Reliable airport pickup and drop-off services available across Sri Lanka.',
    icon: Plane,
  },
  {
    title: 'Private Tours',
    description: 'Tailor-made travel experiences with professional chauffeurs.',
    icon: MapPinned,
  },
  {
    title: 'Luxury Fleet',
    description: 'Modern cars, spacious vans, minibuses and premium coaches.',
    icon: CarFront,
  },
  {
    title: '24/7 Support',
    description: 'Friendly customer assistance before, during and after every journey.',
    icon: ShieldCheck,
  },
];

export default function HomeStats() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-slate-900 sm:py-24 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(56,189,248,0.08),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(14,165,233,0.07),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_16%,rgba(56,189,248,0.12),transparent_36%),radial-gradient(circle_at_82%_28%,rgba(14,165,233,0.1),transparent_34%)]" />
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-300/18 blur-3xl dark:bg-sky-500/15" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/14 blur-3xl dark:bg-cyan-500/10" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_22px_52px_rgba(15,23,42,0.12)] sm:p-9 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.85),transparent_36%,rgba(56,189,248,0.08))] dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.75),transparent_40%,rgba(56,189,248,0.12))]" />
            <div className="relative flex h-full flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-800 backdrop-blur-xl dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-100">
                <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-300" />
                PREMIUM FLEET
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-[2.6rem] dark:text-white">
                Travel Sri Lanka in Comfort, Luxury & Confidence
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
                Whether you&apos;re arriving at the airport, exploring Sri Lanka on a tailor-made tour, attending a business
                meeting, or travelling with family and friends, Q Pick provides the perfect vehicle for every journey.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300"
                >
                  Explore Our Fleet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-sky-300 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50 dark:border-sky-500/45 dark:bg-slate-900 dark:text-sky-200 dark:hover:bg-slate-800"
                >
                  Book Your Ride
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.06, ease: 'easeOut' }}
            className="relative flex min-h-[340px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:min-h-[430px] md:p-6 xl:min-h-[520px] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_52%_56%,rgba(56,189,248,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_52%_56%,rgba(56,189,248,0.16),transparent_62%)]" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-full w-full"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/assets/images/wda11.png"
                  alt="Premium vehicle composition featuring luxury car, premium van and luxury coach"
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featureItems.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_16px_38px_rgba(15,23,42,0.1)] backdrop-blur-xl transition duration-300 hover:border-sky-300 hover:shadow-[0_24px_52px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-black/35 dark:hover:border-sky-400/70 dark:hover:shadow-black/45"
              >
                <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-300/18 blur-3xl dark:bg-sky-500/15" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(125,211,252,0.14),transparent_48%)] dark:bg-[radial-gradient(circle_at_24%_18%,rgba(56,189,248,0.16),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-sky-300/0 transition-colors duration-300 group-hover:border-sky-300/30 dark:group-hover:border-sky-400/30" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600 shadow-[0_10px_24px_rgba(56,189,248,0.2)] backdrop-blur-xl dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-200">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="relative mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
