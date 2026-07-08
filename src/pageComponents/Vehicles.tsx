'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Car, Users, Shield, Info } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { ContactPopup } from '@/pageComponents/homePage/VehicleSection';
import { vehicles, type VehicleItem } from '@/data/vehicles';

const importantInfo = [
  {
    title: 'Fuel & Additional Kilometers',
    description:
      'Fuel is included for the initial kilometer range. Additional kilometers are charged at specified rates per vehicle.',
  },
  {
    title: 'Tolls & Parking',
    description: 'Toll fees and parking charges are additional and vary by location and route.',
  },
  {
    title: 'Seasonal Rates',
    description: 'Rates may increase during peak season (December to March) and special events.',
  },
  {
    title: 'Insurance Coverage',
    description: 'Comprehensive insurance included for all vehicles with standard liability coverage.',
  },
];

const Vehicles = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Our Premium Fleet"
        subtitle="Experience luxury and comfort with our diverse range of vehicles."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Vehicles' }]}
      />

      <div id="vehicles-section" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <AnimatedSection
              key={vehicle.type}
              animation="slide-up"
              className="h-full"
            >
              <div className="bg-white dark:bg-[#1C2537]/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                <div className="relative h-64">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.type}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                    style={('imagePosition' in vehicle && vehicle.imagePosition) ? { objectPosition: vehicle.imagePosition } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-2xl font-bold text-white">{vehicle.type}</h2>
                    <p className="text-gray-200">{vehicle.models}</p>
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Users className="w-5 h-5" />
                      <h3 className="font-semibold">Best For</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{vehicle.bestFor}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Shield className="w-5 h-5" />
                      <h3 className="font-semibold">Inclusions</h3>
                    </div>
                    <ul className="space-y-2">
                      {vehicle.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-gray-600 dark:text-gray-400">{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Car className="w-5 h-5" />
                    Book Now
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <section className="bg-[#F8F9FA] dark:bg-[#0B1120]/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/15 px-4 py-2 text-primary-dark dark:text-white">
                <Info className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide">Good to know</span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Important Information
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A few practical details to help you plan your trip smoothly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {importantInfo.map((item) => (
                <div
                  key={item.title}
                  className="relative rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-6 overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" aria-hidden />

                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 dark:bg-white/10">
                        <Info className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedVehicle && (
        <ContactPopup 
          isOpen={selectedVehicle !== null}
          onClose={() => setSelectedVehicle(null)}
          vehicle={selectedVehicle}
        />
      )}
    </div>
  );
};

export default Vehicles;