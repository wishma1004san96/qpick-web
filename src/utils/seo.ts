import type { Metadata } from 'next';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL = rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl : 'http://localhost:3000';

export const SITE_NAME = 'Q Pick';
export const DEFAULT_TITLE = 'Q Pick - Chauffeur Tours & Travel in Sri Lanka';
export const DEFAULT_DESCRIPTION =
  'Explore Sri Lanka with Q Pick private chauffeur tours, tailor-made itineraries, airport transfers, and premium vehicles.';

const DEFAULT_OG_IMAGE = '/images/logo/qpick-logo.webp';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
  type?: 'website' | 'article';
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  images = [DEFAULT_OG_IMAGE],
  type = 'website',
  noIndex = false,
}: BuildMetadataInput): Metadata {
  return {
    title: title ?? DEFAULT_TITLE,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      url: path,
      title: title ?? DEFAULT_TITLE,
      description,
      siteName: SITE_NAME,
      images,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? DEFAULT_TITLE,
      description,
      images,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
  };
}

