'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Phone, Mail, MapPin, User, Globe, MessageSquare } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { sendEmail } from '../services/emailService';
import PageHero from '@/components/PageHero';

const ContactOfficeMap = dynamic(() => import('./ContactOfficeMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-50 dark:bg-[#0B1120]/40" aria-label="Loading office map" />
  ),
});

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await sendEmail({
        ...formData,
        persons: "N/A",
        days: "N/A",
        subject: "Contact Form Submission",
        details: "Contact form submission from website"
      });

      if (success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          message: ''
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Get in Touch"
        subtitle="Have questions about our services? We're here to help you create the perfect Sri Lankan experience."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="relative bg-[#F8F9FA] dark:bg-[#0B1120] py-16 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gray-200/70 dark:bg-white/10" aria-hidden />

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <AnimatedSection animation="slide-up">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/15 px-4 py-2 text-primary-dark dark:text-white">
                  <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                  <span className="text-sm font-semibold tracking-wide">Contact Q Pick</span>
                </div>

                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Let&apos;s plan your ride
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reach out anytime—airport pickups, chauffeur tours, custom routes. We&apos;ll respond as soon as possible.
                </p>
              </AnimatedSection>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 dark:bg-white/10">
                      <Phone className="w-6 h-6 text-primary dark:text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">Phone</div>
                      <div className="mt-2 space-y-1">
                        <a
                          href="tel:+94114334334"
                          className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer"
                        >
                          +94 11 433 4334
                        </a>
                        <a
                          href="tel:+94114734334"
                          className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer"
                        >
                          +94 11 473 4334
                        </a>
                        <a
                          href="tel:+94773619000"
                          className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer"
                        >
                          +94 77 361 9000
                        </a>
                        <a
                          href="tel:+94783619000"
                          className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer"
                        >
                          +94 78 361 9000
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 dark:bg-white/10">
                      <Mail className="w-6 h-6 text-primary dark:text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">Email</div>
                      <a
                        href="mailto:contact@quickpickapp.com"
                        className="mt-2 inline-block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer"
                      >
                        contact@quickpickapp.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-1 rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 dark:bg-white/10">
                      <MapPin className="w-6 h-6 text-primary dark:text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">Location</div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        No. 230A, Palagathura, Negombo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-1 rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-4">
                  <div className="rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10">
                    <ContactOfficeMap />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatedSection animation="slide-up" delay={100}>
                <div className="rounded-3xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a message</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Share your plan and we&apos;ll get back with the best options.
                      </p>
                    </div>
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 dark:bg-white/10">
                      <MessageSquare className="w-6 h-6 text-primary dark:text-white" />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Mike Kone"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="mike@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="+94 7X XXX XXXX"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Country
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Your Country"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell us what you need (pickup date, places you plan to visit, group size, etc.)"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full min-h-[54px] rounded-xl bg-primary hover:bg-primary-dark text-white px-8 py-4 sm:py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending Message...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

