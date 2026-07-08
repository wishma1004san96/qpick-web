import React from 'react';
import { Scale, FileText, Shield, AlertCircle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';

const Terms = () => {
  const sections = [
    { id: 'acceptance-of-terms', label: 'Acceptance of Terms' },
    { id: 'service-description', label: 'Service Description' },
    { id: 'booking-and-payments', label: 'Booking and Payments' },
    { id: 'cancellation-policy', label: 'Cancellation Policy' },
    { id: 'liability-and-insurance', label: 'Liability and Insurance' },
    { id: 'your-responsibilities', label: 'Your Responsibilities' },
    { id: 'changes-and-modifications', label: 'Changes and Modifications' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'dispute-resolution', label: 'Dispute Resolution' },
    { id: 'contact-information', label: 'Contact Information' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]}
      />

      <div className="container mx-auto px-4 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-800">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">On this page</div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: <span className="font-medium text-gray-900 dark:text-white">March 15, 2024</span>
                  </div>
                </div>

                <nav aria-label="Terms table of contents" className="p-3">
                  <ul className="space-y-1">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                          <span className="font-medium group-hover:text-gray-900 dark:group-hover:text-white">
                            {s.label}
                          </span>
                          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <section>
              <AnimatedSection animation="slide-up">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] shadow-sm overflow-hidden">
                  <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: Scale,
                          title: 'Legal Agreement',
                          desc: 'These terms constitute a legally binding agreement between you and Q Pick.',
                        },
                        {
                          icon: FileText,
                          title: 'Service Terms',
                          desc: 'Detailed conditions for using our travel and transportation services.',
                        },
                        {
                          icon: Shield,
                          title: 'Your Protection',
                          desc: 'We ensure fair and transparent business practices.',
                        },
                        {
                          icon: AlertCircle,
                          title: 'Important Notices',
                          desc: 'Key points you should know about our services.',
                        },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.title}
                            className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B1120] p-5 hover:shadow-md transition"
                          >
                            <div className="flex items-start gap-4">
                              <div className="shrink-0 rounded-2xl bg-primary/10 p-3 border border-primary/20">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="mt-1 text-gray-600 dark:text-gray-300">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
                      <section id="acceptance-of-terms" className="scroll-mt-28">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                          By accessing or using Q Pick&rsquo;s services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.
                        </p>
                      </section>

                      <section id="service-description" className="scroll-mt-28">
                        <h2>2. Service Description</h2>
                        <p>
                          Q Pick provides travel and transportation services in Sri Lanka, including but not limited to:
                        </p>
                        <ul>
                          <li>Tour packages and excursions</li>
                          <li>Vehicle rentals with drivers</li>
                          <li>Accommodation bookings</li>
                          <li>Travel planning and consultation</li>
                        </ul>
                      </section>

                      <section id="booking-and-payments" className="scroll-mt-28">
                        <h2>3. Booking and Payments</h2>
                        <h3>3.1 Reservations</h3>
                        <ul>
                          <li>All bookings are subject to availability</li>
                          <li>A 25% deposit is required to confirm bookings</li>
                          <li>Full payment is required 7 days before service date</li>
                        </ul>

                        <h3>3.2 Payment Methods</h3>
                        <ul>
                          <li>Credit/Debit cards</li>
                          <li>Bank transfers</li>
                          <li>Cash payments (for certain services)</li>
                        </ul>
                      </section>

                      <section id="cancellation-policy" className="scroll-mt-28">
                        <h2>4. Cancellation Policy</h2>
                        <p>Our cancellation policy is as follows:</p>
                        <ul>
                          <li>7+ days before service: Full refund minus processing fees</li>
                          <li>3-6 days before service: 50% refund</li>
                          <li>Less than 3 days: No refund</li>
                        </ul>
                      </section>

                      <section id="liability-and-insurance" className="scroll-mt-28">
                        <h2>5. Liability and Insurance</h2>
                        <p>
                          While we maintain comprehensive insurance coverage, Q Pick is not liable for:
                        </p>
                        <ul>
                          <li>Loss or damage of personal belongings</li>
                          <li>Injuries or accidents not directly caused by our services</li>
                          <li>Delays or changes due to circumstances beyond our control</li>
                        </ul>
                      </section>

                      <section id="your-responsibilities" className="scroll-mt-28">
                        <h2>6. Your Responsibilities</h2>
                        <p>As a client, you are responsible for:</p>
                        <ul>
                          <li>Providing accurate information for bookings</li>
                          <li>Having valid travel documents</li>
                          <li>Following local laws and regulations</li>
                          <li>Respecting our staff and facilities</li>
                        </ul>
                      </section>

                      <section id="changes-and-modifications" className="scroll-mt-28">
                        <h2>7. Changes and Modifications</h2>
                        <p>
                          Q Pick reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
                        </p>
                      </section>

                      <section id="privacy-policy" className="scroll-mt-28">
                        <h2>8. Privacy Policy</h2>
                        <p>
                          Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
                        </p>
                      </section>

                      <section id="dispute-resolution" className="scroll-mt-28">
                        <h2>9. Dispute Resolution</h2>
                        <p>
                          Any disputes arising from these terms will be resolved through:
                        </p>
                        <ul>
                          <li>Direct negotiation</li>
                          <li>Mediation</li>
                          <li>Legal proceedings in Sri Lankan courts</li>
                        </ul>
                      </section>

                      <section id="contact-information" className="scroll-mt-28">
                        <h2>10. Contact Information</h2>
                        <p>For questions about these Terms & Conditions, please contact:</p>
                        <ul>
                          <li>
                            Email: <a className="cursor-pointer" href="mailto:contact@quickpickapp.com">contact@quickpickapp.com</a>
                          </li>
                          <li>
                            Phone: <a className="cursor-pointer" href="tel:+94114334334">+94 11 433 4334</a>
                          </li>
                          <li>Address: No. 230A, Palagathura, Negombo.</li>
                        </ul>
                      </section>
                    </div>

                    <div className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0B1120] p-6">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Last Updated: March 15, 2024
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
