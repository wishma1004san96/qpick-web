'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

import AnimatedSection from '@/components/AnimatedSection';
import { tours, type Tour } from '@/data/tours';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const pickRandom = <T,>(items: T[], count: number): T[] => {
  if (count <= 0) return [];
  if (items.length <= count) return items.slice();

  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
};

const ToursPackages = () => {
  // Use a stable initial render (SSR-safe), then randomize on the client.
  const [visibleTours, setVisibleTours] = useState<Tour[]>(() => tours.slice(0, 6));

  useEffect(() => {
    setVisibleTours(pickRandom(tours, 6));
  }, []);

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#0B1120] py-16">
      <AnimatedSection animation="slide-up">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-3 text-[#2C3E50] dark:text-white">Tours Packages</h2>
            <p className="text-[#495057] dark:text-gray-400">
              Discover the best of Sri Lanka with our carefully curated tour packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTours.map((tour: Tour) => (
              <div
                key={tour.title}
                className="card-hover bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800 flex flex-col"
              >
                <div className="relative">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    width={800}
                    height={400}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tour.location}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">
                      <Link
                        href={`/tours/${encodeURIComponent(slugify(tour.title))}`}
                        className="text-[#2C3E50] dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {tour.title}
                      </Link>
                    </h3>
                    <p className="text-[#495057] dark:text-gray-400 text-sm mb-4">{tour.shortDescription}</p>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center gap-1 text-sm text-[#495057] dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/tours/${encodeURIComponent(slugify(tour.title))}`}
                      className="button-hover block w-full text-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/tours"
              className="button-hover inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Show all tours
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ToursPackages;
