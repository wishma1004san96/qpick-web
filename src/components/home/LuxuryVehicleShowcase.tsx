'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CarFront, Users } from 'lucide-react';
import { vehicles } from '@/data/vehicles';

const featuredVehicles = vehicles.slice(0, 6);

export default function LuxuryVehicleShowcase() {
  return (
    <section id="fleet" className="relative overflow-hidden bg-transparent py-20 text-slate-900 sm:py-24 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(56,189,248,0.08),transparent_34%),radial-gradient(circle_at_80%_22%,rgba(14,165,233,0.06),transparent_30%)] dark:bg-[radial-gradient(circle_at_22%_14%,rgba(56,189,248,0.12),transparent_36%),radial-gradient(circle_at_80%_22%,rgba(14,165,233,0.1),transparent_34%)]" />
      <div className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-sky-300/18 blur-3xl dark:bg-sky-500/15" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-80 w-80 rounded-full bg-cyan-300/14 blur-3xl dark:bg-cyan-500/10" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-800 backdrop-blur-xl dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-100">
            <CarFront className="h-3.5 w-3.5 text-sky-500 dark:text-sky-300" />
            PREMIUM FLEET
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Choose the Perfect Vehicle for Every Journey
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Premium chauffeur-driven vehicles for airport transfers, private tours, business travel and family holidays
            across Sri Lanka.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featuredVehicles.map((vehicle, index) => (
            <motion.article
              key={vehicle.type}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -7 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/10 backdrop-blur-xl transition duration-300 hover:border-sky-300/90 hover:shadow-2xl hover:shadow-slate-900/20 dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-black/35 dark:hover:border-sky-400/70 dark:hover:shadow-black/50"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.type}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  style={vehicle.imagePosition ? { objectPosition: vehicle.imagePosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/54 via-slate-950/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur-xl dark:border-slate-500/40 dark:bg-slate-900/70 dark:text-slate-100">
                  <Users className="h-3.5 w-3.5 text-sky-600 dark:text-sky-300" />
                  {vehicle.models}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">{vehicle.type}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{vehicle.bestFor}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {vehicle.inclusions.slice(0, 3).map((feature) => (
                    <span
                      key={`${vehicle.type}-${feature}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-300" />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/vehicles"
                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-600 dark:bg-sky-500 dark:shadow-sky-900/40 dark:hover:bg-sky-400"
                  >
                    View Vehicle
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/vehicles"
            className="inline-flex items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300 dark:bg-sky-500 dark:text-white dark:shadow-sky-900/40 dark:hover:bg-sky-400"
          >
            Explore Full Fleet
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
