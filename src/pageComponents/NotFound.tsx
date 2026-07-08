import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#0B1120]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          {/* Dark(ish) top gradient so the sticky navbar stays readable */}
          <div className="absolute top-0 left-0 right-0 h-32 sm:h-36 bg-gradient-to-b from-[#0B1120] via-primary-dark/60 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent dark:from-primary/15" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]" style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5 backdrop-blur px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
              Error 404
              <span className="h-1 w-1 rounded-full bg-gray-400/70" />
              Page not found
            </p>

            <div className="mt-8">
              <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                404
              </h1>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                We can&apos;t find that page
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                The link may be broken, the page may have been moved, or it never existed.
              </p>
            </div>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer w-full sm:w-auto"
              >
                Go to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer w-full sm:w-auto"
              >
                Contact Support
              </Link>
            </div>

            <div className="mt-12 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-white/5 backdrop-blur p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Popular pages</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Destinations', href: '/destinations' },
                  { label: 'Tours', href: '/tours' },
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'Blog', href: '/blog' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B1120] px-4 py-3 hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                    <span className="text-sm text-primary group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              Tip: check the URL for typos or go back to the previous page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
