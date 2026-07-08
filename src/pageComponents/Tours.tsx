import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

import PageHero from '@/components/PageHero';
import { tours } from '@/data/tours';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function ToursPage() {
  return (
    <main className="bg-[#F8F9FA] dark:bg-[#0B1120]">
      <PageHero
        title="Tours"
        subtitle="Explore our tour collection and open a tour to see the full details."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tours' }]}
      />

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => {
              const slug = slugify(tour.title);

              return (
                <Link
                  key={tour.title}
                  href={`/tours/${encodeURIComponent(slug)}`}
                  className="group card-hover bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800 flex flex-col"
                >
                  <div className="relative">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      width={800}
                      height={400}
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tour.location}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold mb-2 text-[#2C3E50] dark:text-white group-hover:text-primary transition-colors">
                        {tour.title}
                      </h2>
                      <p className="text-[#495057] dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {tour.shortDescription}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-[#495057] dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end">
                      <span className="inline-flex items-center gap-2 text-primary font-medium">
                        View details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
