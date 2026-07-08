import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, ShieldCheck, Users } from 'lucide-react';

const AgencySection = () => {
  return (
    <section id="agency-section" className="relative scroll-mt-16 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F8F9FA] dark:from-[#0B1120] dark:to-black/20" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 pointer-events-none bg-gradient-to-tr from-primary/15 via-accent/10 to-transparent blur-2xl" />

              <div className="relative rounded-3xl overflow-hidden border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
                <div className="relative h-[420px]">
                  <Image
                    src="/assets/images/wda10.jpeg"
                    alt="Sri Lankan travel experience"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>

                <div className="absolute left-5 bottom-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 text-white">
                    <BadgeCheck className="w-5 h-5 text-accent" />
                    <div className="text-sm font-semibold">Government registered association</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-4 py-2">
              <span className="text-sm font-semibold tracking-wide">About Q Pick</span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Sri Lanka&apos;s premier chauffeur-driven travel experience
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Welcome to Q Pick – Airport Travel Counters Chauffeur Association, Sri Lanka&apos;s premier chauffeur-driven
              travel service provider. Established in 2019, we set the benchmark for trust, professionalism, and
              excellence in the industry. Officially registered with the government, Q Pick brings together highly
              experienced and licensed chauffeurs dedicated to delivering an unmatched travel experience.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="mt-3 font-semibold text-gray-900 dark:text-white">Trusted & safe</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Professional chauffeurs, reliable support.</div>
              </div>

              <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="mt-3 font-semibold text-gray-900 dark:text-white">Experienced team</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">A well-organized association.</div>
              </div>

              <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="mt-3 font-semibold text-gray-900 dark:text-white">Registered</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Officially recognized and accountable.</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white px-8 py-3 text-lg font-medium transition-transform duration-300 hover:scale-[1.02]"
              >
                Discover Our Story →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-8 py-3 text-lg font-medium hover:border-primary dark:hover:border-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgencySection;

