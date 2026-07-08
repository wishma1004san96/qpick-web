import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'information-we-collect', label: 'Information We Collect' },
    { id: 'how-we-use-your-information', label: 'How We Use Your Information' },
    { id: 'information-sharing', label: 'Information Sharing' },
    { id: 'your-rights', label: 'Your Rights' },
    { id: 'security', label: 'Security' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'changes-to-this-policy', label: 'Changes to This Policy' },
    { id: 'contact-us', label: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is important to us"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
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

                <nav aria-label="Privacy policy table of contents" className="p-3">
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
                    <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                      This Privacy Policy explains how Q Pick (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and shares your personal information when you use our services.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: Shield,
                          title: 'Data Protection',
                          desc: 'We implement robust measures to protect your personal information.',
                        },
                        {
                          icon: Lock,
                          title: 'Secure Transactions',
                          desc: 'All payment transactions are encrypted and processed securely.',
                        },
                        {
                          icon: Eye,
                          title: 'Transparency',
                          desc: 'We are clear about how we collect and use your information.',
                        },
                        {
                          icon: UserCheck,
                          title: 'Your Control',
                          desc: 'You have full control over your personal data and preferences.',
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

                    <div className="mt-10 space-y-10 prose prose-lg dark:prose-invert max-w-none">
                      <section id="information-we-collect" className="scroll-mt-28">
                        <h2>Information We Collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                          <li>Name and contact information</li>
                          <li>Payment information</li>
                          <li>Travel preferences and requirements</li>
                          <li>Feedback and correspondence</li>
                        </ul>
                      </section>

                      <section id="how-we-use-your-information" className="scroll-mt-28">
                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                          <li>Process bookings and payments</li>
                          <li>Communicate with you about our services</li>
                          <li>Improve our services and user experience</li>
                          <li>Comply with legal obligations</li>
                        </ul>
                      </section>

                      <section id="information-sharing" className="scroll-mt-28">
                        <h2>Information Sharing</h2>
                        <p>We may share your information with:</p>
                        <ul>
                          <li>Service providers (hotels, transport companies)</li>
                          <li>Payment processors</li>
                          <li>Legal authorities when required by law</li>
                        </ul>
                      </section>

                      <section id="your-rights" className="scroll-mt-28">
                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                          <li>Access your personal information</li>
                          <li>Correct inaccurate information</li>
                          <li>Request deletion of your information</li>
                          <li>Opt out of marketing communications</li>
                        </ul>
                      </section>

                      <section id="security" className="scroll-mt-28">
                        <h2>Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                      </section>

                      <section id="cookies" className="scroll-mt-28">
                        <h2>Cookies</h2>
                        <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                      </section>

                      <section id="changes-to-this-policy" className="scroll-mt-28">
                        <h2>Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.</p>
                      </section>

                      <section id="contact-us" className="scroll-mt-28">
                        <h2>Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul>
                          <li>Email: <a className="cursor-pointer" href="mailto:contact@quickpickapp.com">contact@quickpickapp.com</a></li>
                          <li>Phone: <a className="cursor-pointer" href="tel:+94114334334">+94 11 433 4334</a></li>
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

export default PrivacyPolicy;
