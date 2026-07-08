'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';

export type DestinationListingItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  highlights: string[];
  duration: string;
  bestTime: string;
  category: string;
  featured: boolean;
};

const DestinationCard = ({ destination }: { destination: DestinationListingItem }) => {
  return (
    <Link
      href={`/destinations/${encodeURIComponent(destination.slug)}`}
      className="group card-hover bg-white dark:bg-[#1C2537]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800 flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination.category || 'Destination'}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 text-[#2C3E50] dark:text-white group-hover:text-primary transition-colors">
          {destination.name}
        </h2>
        <p className="text-[#495057] dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        {(destination.duration || destination.bestTime) ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#495057] dark:text-gray-400">
            {destination.duration ? (
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{destination.duration}</span>
              </span>
            ) : null}

            {destination.bestTime ? (
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{destination.bestTime}</span>
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end">
          <span className="inline-flex items-center gap-2 text-primary font-medium">
            View details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const Destinations = ({ destinations }: { destinations: DestinationListingItem[] }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Explore Sri Lanka"
        subtitle="Discover the beauty and cultural heritage of Sri Lanka through our curated destinations"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
      />

      <section className="bg-[#F8F9FA] dark:bg-[#0B1120] py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slide-up" delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.slug}
                  destination={destination}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
