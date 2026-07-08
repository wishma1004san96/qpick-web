'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Diamond, Eye, Target, X } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';


interface ImageLightboxProps {
  image: string;
  onClose: () => void;
}

const ImageLightbox = ({ image, onClose }: ImageLightboxProps) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>
      <div 
        className="absolute inset-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[280px] h-[280px]">
          <Image
            src={image}
            alt="Team member"
            fill
            sizes="(max-width: 768px) 80vw, 280px"
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Our Story"
        subtitle="Since 2015, we've been crafting unforgettable journeys through the heart of Sri Lanka, combining luxury, adventure, and authentic experiences."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <section className="relative bg-[#F8F9FA] dark:bg-[#0B1120] py-16 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gray-200/70 dark:bg-white/10" aria-hidden />

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <AnimatedSection animation="slide-up">
                <div className="lg:sticky lg:top-28">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/15 px-4 py-2 text-primary-dark dark:text-white">
                    <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                    <span className="text-sm font-semibold tracking-wide">About Q Pick</span>
                  </div>

                  <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    What drives us
                  </h2>

                  <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    A modern travel experience built on trust, comfort, and local expertise.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Diamond,
                    title: 'Our Values',
                    description:
                      'Excellence in service, integrity in business, and respect for our cultural heritage guide every aspect of our operations.',
                  },
                  {
                    icon: Eye,
                    title: 'Our Vision',
                    description:
                      "To be Sri Lanka's most trusted travel partner, creating meaningful connections between travelers and our beautiful island.",
                  },
                  {
                    icon: Target,
                    title: 'Our Mission',
                    description:
                      "To deliver exceptional travel experiences that showcase Sri Lanka's beauty while supporting local communities and sustainable tourism.",
                  },
                ].map((value, index) => (
                  <AnimatedSection key={index} animation="scale-up" delay={index * 150} className="h-full">
                    <div className="relative h-full rounded-3xl border border-gray-200/70 dark:border-white/12 bg-white dark:bg-white/[0.06] p-7 shadow-sm transition-colors hover:bg-white dark:hover:bg-white/[0.10] hover:shadow-md">
                      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/10 dark:bg-white/10 blur-2xl" aria-hidden />
                      <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-accent/10 dark:bg-white/10 blur-2xl" aria-hidden />

                      <div className="relative">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/15">
                          <value.icon className="h-7 w-7 text-primary dark:text-white" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {}
      <section id="leadership-team" className="py-20 bg-[#0B1120]">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slide-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Leadership Team</h2>
              <p className="text-gray-300">
                Meet the visionaries behind our success, dedicated to creating exceptional 
                travel experiences and leading our company into the future.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <AnimatedSection
                key={index}
                animation="scale-up"
                delay={index * 200}
              >
                <div className="group relative bg-[#1C2537] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div 
                    className="cursor-pointer bg-[#0F172A] flex items-center justify-center py-8"
                    onClick={() => setSelectedImage(member.image)}
                  >
                    <div className="w-28 h-28 rounded-full bg-[#111827] flex items-center justify-center ring-1 ring-white/10">
                      <User className="w-14 h-14 text-white/90" />
                    </div>
                  </div>
                  <div className="p-6 text-center bg-[#1C2537]/95 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-gray-400 font-light">{member.position}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}
      

      {selectedImage && (
        <ImageLightbox 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};
export default AboutUs;

