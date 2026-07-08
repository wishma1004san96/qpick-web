'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { getDestinationsForListing } from '@/data/destinations-data';

export default function BentoDestinationsSection() {
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    const all = getDestinationsForListing();
    const shuffled = [...all].sort(() => 0.5 - Math.random());
    setDestinations(shuffled.slice(0, 6));
  }, []);

  if (destinations.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0B1120]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection animation="slide-up">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Discover Sri Lanka
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 mx-auto">
              Explore the most beautiful and iconic locations across our tropical paradise.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px] max-w-7xl mx-auto">
          {destinations.map((dest, index) => {
            // Determine grid span based on index
            let gridClass = "md:col-span-1 md:row-span-1"; // Default small
            if (index === 0) {
              gridClass = "md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0"; // Large left
            } else if (index === 1) {
              gridClass = "md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-0"; // Top right wide
            } else if (index === 2 || index === 3) {
              gridClass = "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0"; // Middle right smalls
            } else if (index === 4 || index === 5) {
              gridClass = "md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-0"; // Bottom wides
            } else {
              gridClass = "hidden"; // Hide extra ones just in case
            }

            if (index > 5) return null;

            return (
              <AnimatedSection
                key={dest.id}
                animation="fade-in"
                delay={index * 150}
                className={`relative rounded-2xl overflow-hidden group w-full h-full ${gridClass}`}
              >
                <Link href={`/destinations/${dest.slug}`} className="block w-full h-full relative">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform md:translate-y-4 group-hover:md:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 text-white/90 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium tracking-wide uppercase">{dest.category || 'Destination'}</span>
                      </div>
                      <h3 className={`font-bold text-white mb-2 ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                        {dest.name}
                      </h3>
                      
                      <div className="hidden md:block overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100">
                        <p className="text-gray-200 text-sm line-clamp-2 mb-4">
                          {dest.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center text-primary font-medium text-sm group-hover:text-white transition-colors mt-2 md:mt-0">
                        Explore <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <AnimatedSection animation="slide-up" delay={600}>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl"
            >
              View All Destinations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
