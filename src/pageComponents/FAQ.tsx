'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Minus, Search, X } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';

const faqs = [
  {
    category: "General Questions",
    questions: [
      {
        q: "What services does Q Pick offer?",
        a: "Q Pick offers comprehensive travel services including tour packages, vehicle rentals, accommodation bookings, and customized travel itineraries across Sri Lanka."
      },
      {
        q: "How do I book a tour or vehicle with Q Pick?",
        a: "You can book through our website by visiting the respective tour or vehicle pages, or contact us directly via phone, email, or the contact form on our website."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit cards, bank transfers, and cash payments. All online payments are secured with industry-standard encryption."
      }
    ]
  },
  {
    category: "Tour Packages",
    questions: [
      {
        q: "Can tours be customized according to my preferences?",
        a: "Yes, we offer fully customizable tour packages. Contact our team to create an itinerary that matches your interests, schedule, and budget."
      },
      {
        q: "What's included in your tour packages?",
        a: "Our packages typically include accommodation, transportation, guided tours, and specified meals. Detailed inclusions are listed with each tour package."
      },
      {
        q: "How far in advance should I book a tour?",
        a: "We recommend booking at least 2-3 months in advance, especially during peak season (December-March). However, we can also accommodate last-minute bookings subject to availability."
      }
    ]
  },
  {
    category: "Vehicle Rentals",
    questions: [
      {
        q: "What types of vehicles do you offer?",
        a: "We offer a range of vehicles including sedans, SUVs, vans (KDH), and buses. All vehicles are well-maintained and come with professional drivers."
      },
      {
        q: "Is insurance included in the vehicle rental?",
        a: "Yes, all our vehicles come with comprehensive insurance coverage. Additional coverage options are available upon request."
      },
      {
        q: "What happens if the vehicle breaks down?",
        a: "We provide 24/7 roadside assistance. In case of a breakdown, we'll arrange for a replacement vehicle to ensure your journey continues smoothly."
      }
    ]
  },
  {
    category: "Booking & Cancellation",
    questions: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellation policies vary by service. Generally, full refunds are available for cancellations made 7 days or more before the service date. Please refer to specific terms for each booking."
      },
      {
        q: "Can I modify my booking after confirmation?",
        a: "Yes, modifications can be made subject to availability and any applicable fees. Contact us as soon as possible to discuss changes."
      },
      {
        q: "Is there a deposit required for bookings?",
        a: "Yes, we typically require a 25% deposit to confirm bookings. The remaining balance is due before the service date."
      }
    ]
  },
  {
    category: "Safety & COVID-19",
    questions: [
      {
        q: "What safety measures do you have in place?",
        a: "We follow all local health guidelines, regularly sanitize vehicles and facilities, and ensure our staff are fully vaccinated. We also provide hand sanitizers in all vehicles."
      },
      {
        q: "Are your drivers vaccinated against COVID-19?",
        a: "Yes, all our drivers and staff are fully vaccinated and regularly tested according to local health guidelines."
      },
      {
        q: "What happens if travel restrictions affect my booking?",
        a: "If government travel restrictions affect your booking, we offer flexible rescheduling options or full refunds depending on the circumstances."
      }
    ]
  }
];

const FAQ = () => {
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const categories = React.useMemo(() => ['All', ...faqs.map((c) => c.category)], []);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredFaqs = React.useMemo(() => {
    return faqs
      .filter((c) => activeCategory === 'All' || c.category === activeCategory)
      .map((c) => {
        if (!normalizedQuery) return c;
        return {
          ...c,
          questions: c.questions.filter((q) => {
            const haystack = `${q.q} ${q.a}`.toLowerCase();
            return haystack.includes(normalizedQuery);
          }),
        };
      })
      .filter((c) => c.questions.length > 0);
  }, [activeCategory, normalizedQuery]);

  React.useEffect(() => {
    setOpenKey(null);
  }, [activeCategory, normalizedQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services and policies"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <div className="container mx-auto px-4 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] shadow-sm">
                <div className="p-5 border-b border-gray-200 dark:border-gray-800">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search questions..."
                      className="w-full pl-11 pr-10 py-3 rounded-xl bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {query.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-200/60 dark:hover:bg-white/10 transition cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {normalizedQuery ? (
                      <span>Showing results for <span className="text-gray-900 dark:text-white font-medium">“{query.trim()}”</span></span>
                    ) : (
                      <span>Browse by category or search.</span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={
                            `px-4 py-2.5 rounded-xl text-left text-sm font-medium transition border ` +
                            (isActive
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5')
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            <section>
              {filteredFaqs.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Try a different search term, or reset filters.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition cursor-pointer"
                    >
                      Clear search
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setActiveCategory('All');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  {filteredFaqs.map((category, categoryIndex) => (
                    <AnimatedSection
                      key={category.category}
                      animation="slide-up"
                      delay={categoryIndex * 80}
                    >
                      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {category.category}
                          </h2>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {category.questions.length} question{category.questions.length === 1 ? '' : 's'}
                          </p>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                          {category.questions.map((faq, index) => {
                            const key = `${category.category}:${index}`;
                            const isOpen = openKey === key;

                            return (
                              <div key={key} className="bg-white dark:bg-[#0F172A]">
                                <button
                                  type="button"
                                  onClick={() => setOpenKey(isOpen ? null : key)}
                                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition cursor-pointer"
                                  aria-expanded={isOpen}
                                >
                                  <span className="font-semibold text-gray-900 dark:text-white leading-snug">
                                    {faq.q}
                                  </span>
                                  <span className={
                                    `mt-0.5 shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl border transition ` +
                                    (isOpen
                                      ? 'bg-primary/10 border-primary/30 text-primary'
                                      : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300')
                                  }>
                                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                  </span>
                                </button>

                                <div
                                  className={
                                    `px-6 overflow-hidden transition-[max-height,opacity] duration-300 ` +
                                    (isOpen ? 'max-h-[420px] opacity-100 pb-6' : 'max-h-0 opacity-0')
                                  }
                                >
                                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {faq.a}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}

                  <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
                    <div className="p-8 sm:p-10 bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Still have questions?
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-7 max-w-2xl">
                        Can&apos;t find the answer you&apos;re looking for? Our team is happy to help with tours, vehicles, and custom itineraries.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-white bg-primary hover:bg-primary-dark transition-colors cursor-pointer"
                        >
                          Contact Us
                        </Link>
                        <Link
                          href="/tours"
                          className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          Explore Tours
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
