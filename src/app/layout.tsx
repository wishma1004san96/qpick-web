import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import Providers from './providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME } from '@/utils/seo';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';


const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl : 'http://localhost:3000';
const metadataBase = (() => {
  try {
    return new URL(siteUrl);
  } catch {
    try {
      return new URL(`https://${siteUrl}`);
    } catch {
      return new URL('http://localhost:3000');
    }
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'travel',
  keywords: [
    'Q Pick',
    'Q Pick Sri Lanka',
    'Ride Booking App',
    'Taxi Booking',
    'Airport Transfers',
    'Chauffeur Service',
    'Private Tours',
    'Tailor Made Tours',
    'Luxury Transport',
    'Sri Lanka Tourism',
    'Travel Sri Lanka',
    'Tour Booking',
    'Taxi App Sri Lanka',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: 'Q Pick | Sri Lanka Tours, Airport Transfers & Ride Booking App',
    description: 'Book premium airport transfers, chauffeur services, private tours, and rides across Sri Lanka with Q Pick.',
    images: ['/images/logo/qpick-logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Q Pick | Sri Lanka Tours, Airport Transfers & Ride Booking App',
    description: 'Explore Sri Lanka with Q Pick - premium tours, airport transfers, chauffeur services, and a smart ride booking app.',
    images: ['/images/logo/qpick-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo/qpick-logo.webp', type: 'image/webp' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

