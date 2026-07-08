'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, MessageCircle, Phone, Send, User, X } from 'lucide-react';

import { sendEmail } from '@/services/emailService';

type Props = {
  tourTitle: string;
  tourLocation?: string;
  tourDuration?: string;
  whatsappNumber?: string; // e.g. +94783619000
  variant?: 'inline' | 'sticky';
};

export default function TourQuoteModal({
  tourTitle,
  tourLocation,
  tourDuration,
  whatsappNumber = '+94783619000',
  variant = 'inline',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stickyBarRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    adults: 2,
    children: 0,
    message: '',
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (variant !== 'sticky') return;

    let rafId: number | null = null;

    const setVar = () => {
      const h = stickyBarRef.current?.getBoundingClientRect().height ?? 0;
      document.documentElement.style.setProperty('--sticky-footer-height', `${Math.ceil(h)}px`);
    };

    const schedule = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setVar();
      });
    };

    setVar();
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('resize', schedule);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      document.documentElement.style.setProperty('--sticky-footer-height', '0px');
    };
  }, [variant]);

  const whatsappDigits = useMemo(() => whatsappNumber.replace(/\D/g, ''), [whatsappNumber]);

  const whatsappMessage = useMemo(() => {
    const base = `Hi Q Pick, I'd like to request a quote for the tour: ${tourTitle}.`;
    const details: string[] = [];

    if (formData.arrivalDate) details.push(`Arrival date: ${formData.arrivalDate}`);
    if (Number.isFinite(formData.adults)) details.push(`Adults: ${formData.adults}`);
    if (Number.isFinite(formData.children)) details.push(`Children: ${formData.children}`);
    if (formData.message.trim()) details.push(`Message: ${formData.message.trim()}`);

    return details.length ? `${base}\n${details.join('\n')}` : base;
  }, [formData.adults, formData.arrivalDate, formData.children, formData.message, tourTitle]);

  const whatsappUrl = useMemo(
    () => `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`,
    [whatsappDigits, whatsappMessage]
  );

  const onClose = () => {
    if (isSubmitting) return;
    setIsOpen(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const success = await sendEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: 'N/A',
        persons: `${formData.adults} adults, ${formData.children} children`,
        days: tourDuration || 'N/A',
        message: formData.message,
        subject: `Tour Quote Request - ${tourTitle}`,
        details: `
Tour Package:
- Title: ${tourTitle}
${tourLocation ? `- Location: ${tourLocation}` : ''}
${tourDuration ? `- Duration: ${tourDuration}` : ''}

Travel Details:
- Arrival Date: ${formData.arrivalDate || 'Not specified'}
- Adults: ${formData.adults}
- Children: ${formData.children}
        `.trim(),
      });

      if (success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          arrivalDate: '',
          adults: 2,
          children: 0,
          message: '',
        });
        setIsOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const setField = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isSticky = variant === 'sticky';
  const buttonClass =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition cursor-pointer ' +
    (isSticky ? 'px-4 py-3 text-sm' : 'px-5 py-4');

  const Actions = (
    <div className={isSticky ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${buttonClass} bg-primary hover:bg-primary-dark text-white`}
      >
        <Send className="w-5 h-5" />
        Request a Quote
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-[#25D366] hover:bg-[#1EBE57] text-white`}
      >
        <MessageCircle className="w-5 h-5" />
        WhatsApp
      </a>
    </div>
  );

  return (
    <>
      {isSticky ? (
        <div
          ref={stickyBarRef}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E9ECEF] dark:border-gray-800 bg-white/95 dark:bg-[#0B1120]/92 backdrop-blur"
        >
          <div className="container mx-auto px-4 py-3">
            {Actions}
            <div className="h-[env(safe-area-inset-bottom)]" aria-hidden />
          </div>
        </div>
      ) : (
        Actions
      )}

      {isOpen ? (
        <div className="fixed inset-0 z-[1000]">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

          <div className="fixed inset-0 overflow-y-auto" onClick={onClose}>
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                className="relative bg-white dark:bg-[#1C2537] w-full max-w-2xl rounded-2xl shadow-xl my-8"
                role="dialog"
                aria-modal="true"
                aria-label={`Request a quote for ${tourTitle}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[90vh] overflow-y-auto modern-scrollbar p-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="sticky top-0 float-right text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
                    disabled={isSubmitting}
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Request a Quote</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Tour package: <span className="font-semibold">{tourTitle}</span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Personal Information</div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Your Name</span>
                          <div className="mt-2 relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              required
                              name="name"
                              value={formData.name}
                              onChange={(e) => setField('name', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary"
                              placeholder="Enter your name"
                            />
                          </div>
                        </label>

                        <label className="block">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Email Address</span>
                          <div className="mt-2 relative">
                            <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              required
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={(e) => setField('email', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary"
                              placeholder="you@example.com"
                            />
                          </div>
                        </label>

                        <label className="block sm:col-span-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Phone Number</span>
                          <div className="mt-2 relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              required
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={(e) => setField('phone', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary"
                              placeholder="+94 7X XXX XXXX"
                            />
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Travel Details</div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label className="block sm:col-span-3">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Arrival Date</span>
                          <div className="mt-2 relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="arrivalDate"
                              value={formData.arrivalDate}
                              onChange={(e) => setField('arrivalDate', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary"
                            />
                          </div>
                        </label>

                        <label className="block">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Number of Adults</span>
                          <input
                            type="number"
                            min={1}
                            name="adults"
                            value={formData.adults}
                            onChange={(e) => setField('adults', Number(e.target.value))}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Number of Children</span>
                          <input
                            type="number"
                            min={0}
                            name="children"
                            value={formData.children}
                            onChange={(e) => setField('children', Number(e.target.value))}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block sm:col-span-3">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Message</span>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={(e) => setField('message', e.target.value)}
                            rows={4}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1120]/40 text-gray-900 dark:text-white outline-none focus:border-primary resize-y"
                            placeholder="Tell us what you’re looking for (hotel type, budget, special requests, etc.)"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-4 font-semibold transition cursor-pointer"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'Sending…' : 'Submit request'}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white px-5 py-4 font-semibold transition cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp this request
                      </a>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      By submitting, you agree we may contact you about this tour.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

