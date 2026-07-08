'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';

const whatsappNumber = '94783619000';
const defaultMessage = encodeURIComponent("Hello Q Pick team, I'd like to learn more about your tour packages.");
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

const WhatsAppButton = () => {
  const pathname = usePathname();
  const [liftForBackToTop, setLiftForBackToTop] = useState(false);
  const shouldHide = Boolean(pathname?.startsWith('/tours/') && pathname !== '/tours');

  useEffect(() => {
    if (shouldHide) {
      setLiftForBackToTop(false);
      return;
    }

    const onScroll = () => {
      setLiftForBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [shouldHide]);

  // Tour details pages already include a dedicated WhatsApp CTA in the sticky footer.
  if (shouldHide) return null;

  const bottomBase = liftForBackToTop ? '6rem' : '1.5rem';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      style={{ bottom: `calc(${bottomBase} + var(--sticky-footer-height, 0px))` }}
      className="fixed right-6 z-50 flex items-center gap-0 sm:gap-2 rounded-full bg-[#25D366] px-3 sm:px-4 py-3 text-white shadow-lg shadow-[#25D366]/40 transition hover:-translate-y-0.5 hover:bg-[#1FB358] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-transparent"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-5 w-5" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;

