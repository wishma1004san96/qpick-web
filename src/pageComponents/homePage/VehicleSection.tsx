'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Shield, Heart, Mail, Phone, Users, Calendar, X, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import { sendEmail } from '@/services/emailService';

export interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: {
    type: string;
    models: string;
  };
}

export const ContactPopup = ({ isOpen, onClose, vehicle }: ContactPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    persons: '1',
    days: '3',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await sendEmail({
        ...formData,
        subject: `Vehicle Booking Inquiry - ${vehicle?.type || 'Vehicle'} - ${formData.persons} Persons, ${formData.days} Days`,
        details: `
Vehicle Details:
Type: ${vehicle?.type || 'Not specified'}
Model: ${vehicle?.models || 'Not specified'}
        `
      });

      if (success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          persons: '1',
          days: '3',
          message: ''
        });
        onClose();
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
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white dark:bg-[#1C2537] w-full max-w-lg rounded-2xl shadow-xl my-8">
            <div className="max-h-[90vh] overflow-y-auto modern-scrollbar p-6">
              <button 
                onClick={onClose}
                className="sticky top-0 float-right text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Book {vehicle?.type || 'a Vehicle'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Fill out the form below to book your transportation</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+1 (234) 567-8900"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      disabled={isSubmitting}
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="persons" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Number of Persons
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="persons"
                        name="persons"
                        min="1"
                        required
                        disabled={isSubmitting}
                        value={formData.persons}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="days" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Number of Days
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="days"
                        name="days"
                        min="1"
                        required
                        disabled={isSubmitting}
                        value={formData.days}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2
                      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Send Booking Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <a href="tel:+94710489000" className="flex items-center gap-2 hover:text-primary">
                  <Phone className="w-4 h-4" />
                  Office +94 11 433 4334
                </a>
                <span>|</span>
                <a href="mailto:contact@quickpickapp.com" className="flex items-center gap-2 hover:text-primary">
                  <Mail className="w-4 h-4" />
                  contact@quickpickapp.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VehicleSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FA] to-white dark:from-[#0B1120] dark:to-black/20" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="absolute right-0 bottom-0 w-full h-[320px] sm:h-[360px] lg:inset-y-0 lg:h-auto lg:w-[58%] opacity-90 dark:opacity-80">
          <Image
            src="/assets/images/wda11.png"
            alt="Vehicle Fleet"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain object-center lg:object-right"
            priority
          />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-l from-transparent via-transparent to-[#F8F9FA]/95 dark:to-[#0B1120]/95" />
          <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-transparent via-transparent to-[#F8F9FA]/95 dark:to-[#0B1120]/95" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-72 sm:pb-80 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection animation="slide-up">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-4 py-2">
                  <span className="text-sm font-semibold tracking-wide">Happy Journey</span>
                </div>

                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Premium rides built for
                  <span className="block">comfort and confidence</span>
                </h2>

                <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Experience the perfect blend of safety and comfort with our premium transportation services. Our commitment to &quot;Safety First Always&quot; ensures peace of mind throughout your journey.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/vehicles')}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-dark text-white px-8 py-3 text-sm font-semibold tracking-wider transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    BOOK VEHICLE
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="inline-flex items-center gap-3 rounded-full bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 px-5 py-3 text-sm text-gray-700 dark:text-gray-200">
                    <span className="inline-flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Safety first
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-400/70" />
                    <span className="inline-flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      Comfort always
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection animation="slide-right" delay={250}>
              <div className="h-full rounded-3xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-7">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/20">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                  Your Safety, Our Priority
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Regular maintenance, professional drivers, and advanced safety features for your peace of mind.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={250}>
              <div className="h-full rounded-3xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-7">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/20">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                  Unmatched Comfort, Always
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Luxurious interiors, climate control, and smooth rides for a comfortable journey.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <ContactPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </section>
  );
}

export default VehicleSection;