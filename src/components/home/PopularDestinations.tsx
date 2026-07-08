'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';

import AnimatedSection from '@/components/AnimatedSection';

const popularDestinations = [
  {
    name: 'Sigiriya',
    slug: 'sigiriya',
    category: 'Heritage',
    description: 'Ancient rock fortress and UNESCO World Heritage Site with breathtaking panoramic views.',
    duration: '1 Day',
    image: '/images/destinations/sigiriya/sigiriya-rock-fortress.avif',
  },
  {
    name: 'Ella',
    slug: 'ella',
    category: 'Hill Country',
    description: 'Scenic mountains, tea plantations and the famous Nine Arches Bridge.',
    duration: '2 Days',
    image: '/images/destinations/ella/ella-sri-lanka.avif',
  },
  {
    name: 'Galle',
    slug: 'galle',
    category: 'Southern Coast',
    description: 'Historic Dutch Fort, boutique cafes and beautiful coastal scenery.',
    duration: '1 Day',
    image: '/images/destinations/galle/galle-sri-lanka.avif',
  },
  {
    name: 'Mirissa',
    slug: 'mirissa',
    category: 'Beach',
    description: 'Golden beaches, whale watching and unforgettable sunsets.',
    duration: '2 Days',
    image: '/images/destinations/mirissa/mirissa-sri-lanka.avif',
  },
  {
    name: 'Nuwara Eliya',
    slug: 'nuwara-eliya',
    category: 'Highlands',
    description: 'Cool climate, waterfalls, tea estates and colonial charm.',
    duration: '2 Days',
    image: '/images/destinations/nuwara-eliya/nuwara-eliya-sri-lanka.avif',
  },
  {
    name: 'Yala National Park',
    slug: 'yala',
    category: 'Wildlife',
    description: "Experience thrilling jeep safaris and Sri Lanka's famous leopards.",
    duration: '1 Day',
    image: '/images/destinations/yala/yala-sri-lanka.avif',
  },
];

const fallbackDestinationImage = '/images/destinations/sigiriya/sigiriya-rock-fortress.avif';

interface PopularDestinationCardProps {
  destination: typeof popularDestinations[number];
  delay: number;
}

const PopularDestinationCard = ({ destination, delay }: PopularDestinationCardProps) => {
  const [imageSrc, setImageSrc] = useState(destination.image);

  return (
    <AnimatedSection animation="slide-up" delay={delay} className="h-full">
      <div className="destination-card group h-full overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={imageSrc}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="card-image object-cover"
            onError={() => setImageSrc(fallbackDestinationImage)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {destination.category}
          </div>
        </div>

        <div className="card-content flex h-[calc(100%-20rem)] flex-col p-6">
          <div className="inline-flex items-center gap-2 text-sm text-primary dark:text-primary-light">
            <Clock3 className="h-4 w-4" />
            <span>{destination.duration}</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {destination.name}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {destination.description}
          </p>

          <div className="mt-auto pt-6">
            <Link
              href={`/destinations/${destination.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary-dark"
            >
              Explore Destination
              <ArrowRight className="card-arrow h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default function PopularDestinations() {
  return (
    <section className="relative bg-white py-16 sm:py-20 dark:bg-[#0B1120]">
      <div className="absolute inset-x-0 top-0 h-px bg-gray-200/70 dark:bg-white/10" aria-hidden />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection animation="slide-up">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary-dark dark:bg-white/10 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                <span className="text-sm font-semibold tracking-wide">Popular Destinations</span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Popular Destinations
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Discover Sri Lanka&apos;s most iconic destinations with our premium chauffeur-driven travel experiences.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {popularDestinations.map((destination, index) => (
              <PopularDestinationCard
                key={destination.slug}
                destination={destination}
                delay={index * 100}
              />
            ))}
          </div>

          <AnimatedSection animation="slide-up" delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-medium text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-primary-dark"
              >
                Explore All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
