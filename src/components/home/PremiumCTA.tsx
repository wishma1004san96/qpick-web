'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

export default function PremiumCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-20 text-slate-900 sm:py-24 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.1),transparent_34%),radial-gradient(circle_at_78%_26%,rgba(14,165,233,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.16),transparent_36%),radial-gradient(circle_at_78%_26%,rgba(14,165,233,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute -left-24 top-8 h-80 w-80 rounded-full bg-sky-400/12 blur-3xl dark:bg-sky-500/15" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-400/8 blur-3xl dark:bg-cyan-500/10" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white/95 px-6 py-10 text-center shadow-[0_24px_64px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-10 sm:py-14 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-black/40"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-800 backdrop-blur-xl dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-100">
            <Sparkles className="h-4 w-4 text-sky-500 dark:text-sky-300" />
            Premium concierge
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Ready to plan a luxury journey in Sri Lanka?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Tell us your dates, destinations, and travel style. We’ll build a polished, private itinerary with the right vehicle, the right driver, and the right pace.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-8 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300"
            >
              Start planning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="tel:+94114334334"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Call +94 11 433 4334
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
