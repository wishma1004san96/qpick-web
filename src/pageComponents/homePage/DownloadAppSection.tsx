import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function DownloadAppSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#F8F9FA] dark:bg-[#0B1120] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-[#E9ECEF] dark:border-gray-800 bg-white/80 dark:bg-[#1C2537]/50 backdrop-blur-sm p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold">
                  Download our App
                </div>
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-[#2C3E50] dark:text-white leading-tight">
                  Plan your trip faster, right from your phone
                </h2>
                <p className="mt-4 text-[#6C757D] dark:text-gray-300 leading-relaxed">
                  Save tours, explore destinations, and request quotes in seconds. Get the Q Pick app from your favorite store.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <Link
                    href="#"
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#111827] hover:bg-black text-white px-5 py-4 font-semibold transition cursor-pointer"
                    aria-label="Download on Google Play"
                  >
                    <FaGooglePlay className="w-5 h-5" />
                    <div className="text-left leading-tight">
                      <div className="text-xs text-white/70 font-medium">Get it on</div>
                      <div className="text-base">Google Play</div>
                    </div>
                  </Link>

                  <Link
                    href="#"
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#111827] hover:bg-black text-white px-5 py-4 font-semibold transition cursor-pointer"
                    aria-label="Download on the App Store"
                  >
                    <FaApple className="w-5 h-5" />
                    <div className="text-left leading-tight">
                      <div className="text-xs text-white/70 font-medium">Download on the</div>
                      <div className="text-base">App Store</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

