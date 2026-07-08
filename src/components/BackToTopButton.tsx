'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{ bottom: 'calc(1.5rem + var(--sticky-footer-height, 0px))' }}
      className="fixed right-6 z-50 flex items-center gap-2 rounded-full bg-primary text-white px-4 py-3 shadow-lg shadow-primary/40 transition hover:-translate-y-0.5 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
      <span className="text-sm font-semibold">Top</span>
    </button>
  );
};

export default BackToTopButton;
