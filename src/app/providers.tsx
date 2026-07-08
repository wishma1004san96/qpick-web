'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import WhatsAppButton from '@/components/WhatsAppButton';

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen overflow-x-hidden bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white transition-colors duration-300"
        style={{ paddingBottom: 'var(--sticky-footer-height, 0px)' }}
      >
        <Navbar />
        <ScrollToTop />
        {children}
        <WhatsAppButton />
        <BackToTopButton />
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </ThemeProvider>
  );
}
