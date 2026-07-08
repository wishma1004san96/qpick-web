'use client';

import Link from 'next/link';
import { ArrowRight, Car, Clock, DollarSign, MapPin, ShieldCheck, Users } from 'lucide-react';

import AnimatedSection from '@/components/AnimatedSection';

const features = [
  {
    icon: ShieldCheck,
    iconWrapperClass: 'from-sky-500 via-blue-500 to-indigo-500 shadow-[0_16px_34px_rgba(37,99,235,0.28)]',
    title: 'Safe & Secure Travel',
    description: 'Licensed chauffeurs, insured vehicles, and safety-first service for every journey.',
  },
  {
    icon: Car,
    iconWrapperClass: 'from-emerald-500 via-teal-500 to-green-500 shadow-[0_16px_34px_rgba(16,185,129,0.28)]',
    title: 'Premium Vehicle Fleet',
    description: 'Modern, air-conditioned cars, vans, SUVs, and minibuses for every travel need.',
  },
  {
    icon: Clock,
    iconWrapperClass: 'from-violet-500 via-purple-500 to-fuchsia-500 shadow-[0_16px_34px_rgba(139,92,246,0.28)]',
    title: '24/7 Customer Support',
    description: 'Our team is available anytime to assist with bookings and travel changes.',
  },
  {
    icon: MapPin,
    iconWrapperClass: 'from-orange-400 via-amber-500 to-orange-600 shadow-[0_16px_34px_rgba(249,115,22,0.28)]',
    title: 'Island-wide Coverage',
    description: 'Airport transfers, city rides, and tours across every destination in Sri Lanka.',
  },
  {
    icon: DollarSign,
    iconWrapperClass: 'from-cyan-400 via-sky-400 to-blue-500 shadow-[0_16px_34px_rgba(34,211,238,0.28)]',
    title: 'Transparent Pricing',
    description: 'No hidden charges. Receive clear pricing before confirming your booking.',
  },
  {
    icon: Users,
    iconWrapperClass: 'from-indigo-500 via-blue-600 to-violet-600 shadow-[0_16px_34px_rgba(79,70,229,0.28)]',
    title: 'Experienced Chauffeurs',
    description: "Friendly local drivers with extensive knowledge of Sri Lanka's roads and attractions.",
  },
];

export default function WhyChooseQPick() {
  return (
    <section id="services" className="relative overflow-hidden bg-transparent py-20 sm:py-24">
      <div
        className="absolute inset-0 opacity-65 dark:opacity-85"
        aria-hidden
        style={{
          backgroundImage: [
            'radial-gradient(circle at 20% 20%, rgba(43,149,214,0.14), transparent 32%)',
            'radial-gradient(circle at 80% 22%, rgba(0,114,188,0.12), transparent 28%)',
            'radial-gradient(circle at 50% 100%, rgba(99,102,241,0.10), transparent 34%)',
          ].join(', '),
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14] dark:opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.14) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-6xl">
          <AnimatedSection animation="slide-up">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary-dark dark:bg-white/10 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                <span className="text-sm font-semibold tracking-wide">Why Choose Q Pick</span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Why Choose Q Pick
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Experience Sri Lanka with trusted chauffeurs, premium vehicles, transparent pricing, and personalized travel service.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} animation="slide-up" delay={index * 100} className="h-full">
                <div className="group h-full rounded-[1.4rem] border border-white/40 bg-gradient-to-br from-white/70 via-sky-50/70 to-blue-50/80 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05)_55%,rgba(59,130,246,0.12))] dark:shadow-[0_24px_70px_rgba(2,8,23,0.34)] dark:hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08)_55%,rgba(59,130,246,0.16))]">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-white/70 p-[1px] shadow-[0_14px_32px_rgba(15,23,42,0.10)] dark:bg-white/10">
                    <div className={`flex h-full w-full items-center justify-center rounded-[1.25rem] bg-gradient-to-br text-white transition-all duration-500 group-hover:brightness-110 ${feature.iconWrapperClass}`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-6 h-px w-14 bg-gradient-to-r from-primary/50 to-transparent dark:from-white/40" aria-hidden />

                  <h3 className="mt-6 text-[1.35rem] font-bold tracking-tight text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-[0.95rem] leading-7 text-gray-600 dark:text-gray-300/90">
                    {feature.description}
                  </p>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/5" aria-hidden />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="slide-up" delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-medium text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-primary-dark"
              >
                Book Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
