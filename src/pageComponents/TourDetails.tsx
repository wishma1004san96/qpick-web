import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, MapPin, XCircle } from 'lucide-react';

import type { Tour, TourInclusions, TourItineraryItem } from '@/data/tours';
import { getDestinationBySlug } from '@/data/destinations-data';
import RouteMapClient, { RouteData } from '@/components/route-map-client';
import TourQuoteModal from '@/components/TourQuoteModal';

export const slugifyTourTitle = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const splitRouteStops = (value: string) => {
  const cleaned = value.replace(/\([^)]*\)/g, '').trim();
  const parts = cleaned
    .split(/\s*[–—-]\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
  return Array.from(new Set(parts));
};

export const getTourDestinations = (tour: Tour) => {
  const slugs = (tour.destinations && tour.destinations.length ? tour.destinations : []) as string[];

  const derived = slugs.length
    ? slugs
    : splitRouteStops(tour.location)
      .map((stop) => slugifyTourTitle(stop))
      .filter((slug) => Boolean(getDestinationBySlug(slug)));

  const unique = Array.from(new Set(derived));
  return unique
    .map((slug) => {
      const dest = getDestinationBySlug(slug);
      return dest ? { slug, name: dest.name } : null;
    })
    .filter(Boolean) as Array<{ slug: string; name: string }>;
};

const getTourItinerary = (tour: Tour): TourItineraryItem[] => {
  if (tour.itinerary && tour.itinerary.length) return tour.itinerary;

  const stops = splitRouteStops(tour.location);
  if (stops.length > 1) {
    return stops.map((title) => ({ title, description: undefined }));
  }

  return [{ title: 'Overview', description: tour.shortDescription }];
};

const getTourInclusions = (tour: Tour): TourInclusions => {
  if (tour.inclusions) return tour.inclusions;

  const includedFromHighlights = tour.highlights
    .filter((h) => /^includes?\b/i.test(h))
    .map((h) => h.replace(/^includes?:?\s*/i, '').trim())
    .filter(Boolean);

  return {
    included: includedFromHighlights,
    notIncluded: ['Flights', 'Visa fees', 'Travel insurance', 'Personal expenses'],
  };
};

export default function TourDetails({ tour, routeData }: { tour: Tour, routeData: RouteData | null }) {
  const itinerary = getTourItinerary(tour);
  const inclusions = getTourInclusions(tour);
  const destinations = getTourDestinations(tour);

  const destinationCards = destinations
    .map((d) => {
      const dest = getDestinationBySlug(d.slug);
      if (!dest) return null;
      const image = dest.image || dest.heroImage;
      return {
        slug: d.slug,
        name: dest.name,
        image,
        shortDescription: dest.shortDescription,
      };
    })
    .filter(Boolean) as Array<{ slug: string; name: string; image?: string; shortDescription?: string }>;

  const tourMapStops = destinations.map(d => d.name);

  return (
    <main className="bg-[#F8F9FA] dark:bg-[#0B1120]">
      <section className="relative overflow-hidden min-h-[75svh]">
        <div className="absolute inset-0" aria-hidden>
          <Image src={tour.image} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-[#0B1120]" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/35 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                  <li>
                    <Link href="/" className="hover:text-white transition cursor-pointer">
                      Home
                    </Link>
                  </li>
                  <li className="text-white/40">/</li>
                  <li>
                    <Link href="/tours" className="hover:text-white transition cursor-pointer">
                      Tours
                    </Link>
                  </li>
                  <li className="text-white/40">/</li>
                  <li className="text-white font-medium">{tour.title}</li>
                </ol>
              </nav>

              <Link
                href="/tours"
                className="inline-flex items-center gap-2 text-white/85 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tours
              </Link>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.02] [text-wrap:balance]">
                    {tour.title}
                  </h1>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center text-sm text-white/85">
                    <div className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="hidden sm:block text-white/35">•</div>
                    <div className="inline-flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>

                  <p className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                    {tour.shortDescription}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-6">
                    <div className="text-sm font-semibold text-white">Highlights</div>
                    <ul className="mt-4 space-y-2 text-sm text-white/90">
                      {tour.highlights.slice(0, 10).map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="mt-1 text-primary">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    {tour.highlights.length > 10 ? (
                      <div className="mt-4 text-xs text-white/70">+ {tour.highlights.length - 10} more</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Tour Itinerary</h2>

                <ol className="mt-4 space-y-3">
                  {itinerary.map((item, idx) => (
                    <li key={`${item.title}-${idx}`} className="flex gap-3">
                      <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-[#2C3E50] dark:text-white">{item.title}</div>
                        {item.description ? (
                          <div className="mt-1 text-sm text-[#495057] dark:text-gray-300">{item.description}</div>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {tourMapStops.length ? (
                <div className="mt-6 bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Tour map</h2>
                    <span className="text-sm text-[#6C757D] dark:text-gray-400">
                      {tourMapStops.length > 1 ? "Route between destinations" : "Tour Location"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <RouteMapClient stops={tourMapStops} serverRouteData={routeData} />
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Inclusions</h2>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-semibold text-[#2C3E50] dark:text-white">Included</div>
                      <ul className="mt-3 space-y-2 text-sm text-[#495057] dark:text-gray-300">
                        {(inclusions.included.length ? inclusions.included : ['Details available on request']).map((item) => (
                          <li key={`inc-${item}`} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-[#2C3E50] dark:text-white">Not included</div>
                      <ul className="mt-3 space-y-2 text-sm text-[#495057] dark:text-gray-300">
                        {inclusions.notIncluded.map((item) => (
                          <li key={`not-${item}`} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 mt-0.5 text-[#6C757D] dark:text-gray-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl border border-[#E9ECEF] dark:border-gray-800 p-6">
                  <h2 className="text-lg font-bold text-[#2C3E50] dark:text-white">Destinations</h2>
                  {destinationCards.length ? (
                    <div className="mt-4 space-y-3">
                      {destinationCards.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/destinations/${encodeURIComponent(d.slug)}`}
                          className="group block rounded-2xl border border-[#E9ECEF] dark:border-gray-800 bg-white/70 dark:bg-[#0B1120]/40 hover:border-primary/40 transition cursor-pointer"
                        >
                          <div className="flex items-start gap-3 p-3">
                            {d.image ? (
                              <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800">
                                <Image
                                  src={d.image}
                                  alt={d.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover group-hover:scale-[1.03] transition-transform"
                                />
                              </div>
                            ) : (
                              <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 border border-[#E9ECEF] dark:border-gray-800" />
                            )}

                            <div className="min-w-0">
                              <div className="font-semibold text-[#2C3E50] dark:text-white group-hover:text-primary transition-colors">
                                {d.name}
                              </div>
                              {d.shortDescription ? (
                                <div className="mt-1 text-sm leading-snug text-[#6C757D] dark:text-gray-400">
                                  {d.shortDescription}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-[#6C757D] dark:text-gray-400">
                      Destinations for this tour will be added soon.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <TourQuoteModal
        variant="sticky"
        tourTitle={tour.title}
        tourLocation={tour.location}
        tourDuration={tour.duration}
      />
    </main>
  );
}
