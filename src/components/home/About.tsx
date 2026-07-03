"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featureCards = [
  {
    title: "Trusted & Safe",
    description: "Professional licensed chauffeurs with high safety standards.",
  },
  {
    title: "Expert Team",
    description: "Experienced local travel professionals providing reliable service.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-24 xl:py-[120px]">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72 }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,rgba(56,189,248,0.12)_45%,rgba(255,255,255,0)_74%)] blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-6 shadow-[0_36px_90px_rgba(15,23,42,0.16)] sm:p-8">
              <div className="relative aspect-[11/10] overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#eef5ff] via-[#f8fbff] to-[#e8f1ff]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(56,189,248,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.16),transparent_45%)]" />
                <div className="relative flex h-full items-center justify-center p-10 sm:p-12">
                  <Image
                    src="/images/logo/qpick-logo.webp"
                    alt="QPick Tours logo"
                    fill
                    sizes="(min-width: 1280px) 520px, (min-width: 768px) 46vw, 92vw"
                    className="object-contain p-[clamp(2rem,5vw,4rem)]"
                    priority
                  />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 4.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, opacity: { duration: 0.6, delay: 0.2 } }}
              className="absolute -left-3 -top-4 rounded-2xl border border-white/60 bg-white/68 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:-left-5 sm:px-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certified</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">✔ Government Registered</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ y: { duration: 4.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, opacity: { duration: 0.6, delay: 0.28 } }}
              className="absolute -bottom-4 -right-3 rounded-2xl border border-white/60 bg-white/68 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:-right-5 sm:px-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Our Journey</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">⭐ 5+ Years of Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75 }}
            className="max-w-[680px]"
          >
            <span className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-[0_10px_24px_rgba(14,116,144,0.12)] sm:text-xs">
              About QPick Tours
            </span>

            <h2 className="mt-6 text-[clamp(2rem,4.2vw,4.1rem)] font-black leading-[0.94] tracking-[0.01em] text-slate-900">
              Sri Lanka&apos;s Premier
              <br />
              <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                Chauffeur
              </span>{" "}
              Experience.
            </h2>

            <p className="mt-7 max-w-[62ch] text-[clamp(1rem,1.06vw,1.18rem)] leading-[1.8] text-slate-600">
              Established in 2019, QPick Tours delivers trusted chauffeur-driven travel experiences across Sri Lanka. Our experienced drivers, premium vehicles, and personalized service ensure every journey is comfortable, safe, and unforgettable.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {featureCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: 0.18 + index * 0.14 }}
                  className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_46px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_54px_rgba(15,23,42,0.16)]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-lg text-white shadow-[0_10px_26px_rgba(37,99,235,0.32)]">
                    ✔
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </motion.article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-base font-semibold text-white shadow-[0_18px_48px_rgba(37,99,235,0.34)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Book Your Tour
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-800 transition duration-300 hover:border-slate-400 hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}