import React from 'react';
import { Compass, Shield, Users, Car } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const features = [
  {
    icon: Compass,
    title: "Exclusive Trips",
    description: "Discover handcrafted journeys designed for unforgettable experiences and maximum comfort. Our exclusive packages ensure you get the best value for your travel investment.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Travel with confidence knowing that your safety and security are our top priorities. We maintain the highest standards of safety protocols across all our services.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: Car,
    title: "Comfort Rides",
    description: "Relax with modern vehicles, smooth drives, and thoughtful service—ideal for airport transfers, day tours, and long-distance routes.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: Users,
    title: "Expert Guides",
    description: "Our professional guides ensure you get the most authentic and enriching travel experience. Each guide is carefully selected and trained to provide exceptional service.",
    color: "from-primary/20 to-primary/5"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/images/boat.jpeg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/35 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-4">
            <AnimatedSection animation="slide-up">
              <div className="lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-semibold tracking-wide">Why Choose Us</span>
                </div>

                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Built for comfort.
                  <span className="block">Designed for confidence.</span>
                </h2>

                <p className="mt-4 text-gray-200 text-lg leading-relaxed">
                  Experience the perfect blend of luxury, adventure, and peace of mind with our comprehensive travel services.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <AnimatedSection
                  key={index}
                  animation="scale-up"
                  delay={index * 150}
                  className="h-full"
                >
                  <div className="group relative h-full rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <div className="relative p-7 sm:p-8">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-colors p-3">
                          <feature.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {feature.title}
                          </h3>
                          <p className="mt-3 text-gray-200 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-2xl" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;