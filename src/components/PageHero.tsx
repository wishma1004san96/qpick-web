'use client';

import Link from 'next/link';

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  align?: 'left' | 'center';
};

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  align = 'center',
}: PageHeroProps) {
  const isCentered = align === 'center';
  const navbarOffset = 'calc(var(--navbar-height, 5.5rem) + 1.5rem)';

  return (
    <section
      className="relative overflow-hidden min-h-[52svh] sm:min-h-[62svh] lg:min-h-[70svh] bg-primary text-white"
      style={{ paddingTop: navbarOffset }}
    >
      <div className="absolute inset-0" aria-hidden>
        {/* Simple, solid background (no gradients) */}
        <div className="absolute inset-0 bg-primary" />

        {/* Subtle non-animated shapes for depth (still solid colors) */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        {/* Oversized watermark text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="select-none font-display text-[120px] sm:text-[160px] lg:text-[220px] font-bold tracking-widest text-white/10">
            Q Pick
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-[inherit] items-start justify-center">
        <div className="container mx-auto px-4 pb-12 pt-6 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-10">
          <div className={`w-full max-w-4xl mx-auto ${isCentered ? 'text-center' : 'text-left'}`}>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
                <ol className={`inline-flex flex-wrap items-center gap-2 ${isCentered ? 'justify-center' : ''}`}>
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1;
                    return (
                      <li key={`${crumb.label}-${i}`} className="inline-flex items-center gap-2">
                        {crumb.href ? (
                          <Link href={crumb.href} className="text-white/90 hover:text-white transition cursor-pointer">
                            {crumb.label}
                          </Link>
                        ) : (
                          <span className="text-white">{crumb.label}</span>
                        )}
                        {!isLast && <span className="text-white/60">/</span>}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}

            <h1 className="text-6xl sm:text-7xl lg:text-8xl 2xl:text-9xl font-bold font-display leading-[0.95] break-words [text-wrap:balance]">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-5 text-lg sm:text-xl text-white/90 leading-relaxed">
                {subtitle}
              </p>
            )}

            <div className={`mt-8 h-px w-24 bg-white/60 ${isCentered ? 'mx-auto' : ''}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

