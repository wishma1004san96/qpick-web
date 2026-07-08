'use client';

import React, { useState } from 'react';
import { 
  User, Mail, Phone, Globe, Calendar, Users, Baby, 
  Landmark, Palmtree, Waves, Mountain, Coffee, 
  UtensilsCrossed, Camera, Sparkles, MessageSquare 
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { sendTailorMadeTourEmail } from '../services/emailService';
import PageHero from '@/components/PageHero';

interface InterestOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

const interests: InterestOption[] = [
  { id: 'cultural', label: 'Cultural Sites', icon: Landmark },
  { id: 'wildlife', label: 'Wildlife & Safari', icon: Palmtree },
  { id: 'beaches', label: 'Beaches & Coast', icon: Waves },
  { id: 'adventure', label: 'Adventure Sports', icon: Mountain },
  { id: 'tea', label: 'Tea Plantations', icon: Coffee },
  { id: 'food', label: 'Food & Cuisine', icon: UtensilsCrossed },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'wellness', label: 'Wellness & Spa', icon: Sparkles },
];

const TailorMadeTours = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    arrivalDate: '',
    duration: '',
    adultCount: '',
    childrenCount: '',
    selectedInterests: [] as string[],
    dreamTrip: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await sendTailorMadeTourEmail(formData);

      if (success) {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          arrivalDate: '',
          duration: '',
          adultCount: '',
          childrenCount: '',
          selectedInterests: [],
          dreamTrip: ''
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

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interestId)
        ? prev.selectedInterests.filter(id => id !== interestId)
        : [...prev.selectedInterests, interestId]
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Tailor Made Tours"
        subtitle="Design your perfect Sri Lankan adventure. Tell us your dreams, and we'll craft a personalized itinerary just for you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tailor Made Tours' }]}
      />

      <section className="relative bg-[#F8F9FA] dark:bg-[#0B1120] py-16 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gray-200/70 dark:bg-white/10" aria-hidden />

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="slide-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/15 px-4 py-2 text-primary-dark dark:text-white mb-4">
                  <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                  <span className="text-sm font-semibold tracking-wide">Custom Journey</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Plan Your Dream Tour
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Every traveler is unique. Share your preferences and let us create an unforgettable experience tailored to your interests.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={100}>
              <div className="rounded-3xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-6 sm:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Personal Information Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address <span className="text-red-500">*</span>
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
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="john.doe@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number <span className="text-red-500">*</span>
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
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Country of Residence <span className="text-red-500">*</span>
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
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="United States"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Travel Details Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Travel Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Arrival Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            id="arrivalDate"
                            name="arrivalDate"
                            value={formData.arrivalDate}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration (Days) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            min="1"
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="7"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="adultCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Number of Adults <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            id="adultCount"
                            name="adultCount"
                            value={formData.adultCount}
                            onChange={handleChange}
                            required
                            min="1"
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="2"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Number of Children
                        </label>
                        <div className="relative">
                          <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            id="childrenCount"
                            name="childrenCount"
                            value={formData.childrenCount}
                            onChange={handleChange}
                            min="0"
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interests Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">What Interests You?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Select all that apply</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {interests.map((interest) => {
                        const Icon = interest.icon;
                        const isSelected = formData.selectedInterests.includes(interest.id);
                        
                        return (
                          <button
                            key={interest.id}
                            type="button"
                            onClick={() => toggleInterest(interest.id)}
                            disabled={isSubmitting}
                            className={`
                              relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                              ${isSelected 
                                ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-md' 
                                : 'border-gray-200 dark:border-white/10 bg-white dark:bg-transparent hover:border-primary/40 hover:bg-primary/5'
                              }
                              disabled:opacity-50 disabled:cursor-not-allowed
                              group
                            `}
                          >
                            <div className="flex flex-col items-center gap-3 text-center">
                              <div className={`
                                h-12 w-12 rounded-xl flex items-center justify-center transition-colors
                                ${isSelected 
                                  ? 'bg-primary text-white' 
                                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary'
                                }
                              `}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <span className={`
                                text-sm font-medium transition-colors
                                ${isSelected 
                                  ? 'text-primary dark:text-primary-light' 
                                  : 'text-gray-700 dark:text-gray-300'
                                }
                              `}>
                                {interest.label}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dream Trip Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tell Us About Your Dream Trip</h3>
                    </div>
                    
                    <textarea
                      id="dreamTrip"
                      name="dreamTrip"
                      value={formData.dreamTrip}
                      onChange={handleChange}
                      rows={6}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
                      placeholder="Describe your ideal Sri Lankan adventure... What experiences are you hoping for? Any specific places you want to visit? Special requirements or preferences we should know about?"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      <span>{isSubmitting ? 'Sending Request...' : 'Submit Tour Request'}</span>
                      <svg 
                        className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Additional Information */}
            <AnimatedSection animation="fade-in" delay={200}>
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Need help or have questions? Contact us at{' '}
                  <a href="tel:+94114334334" className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium transition-colors">
                    +94 11 433 4334
                  </a>
                  {' '}or{' '}
                  <a href="mailto:contact@quickpickapp.com" className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium transition-colors">
                    contact@quickpickapp.com
                  </a>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TailorMadeTours;
