import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import Providers from './providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME } from '@/utils/seo';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';


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
    'Sri Lanka tours',
    'chauffeur service Sri Lanka',
    'airport transfers Sri Lanka',
    'private tours Sri Lanka',
    'tailor made tours Sri Lanka',
    'Q Pick',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/logo/qpick-logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
      { url: '/images/logo/qpick-logo.webp', type: 'image/png' },
      { url: '/images/logo/qpick-logo.webp', type: 'image/png' },
    ],
    shortcut: ['/images/logo/qpick-logo.webp'],
    apple: [{ url: '/images/logo/qpick-logo.webp' }],
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

