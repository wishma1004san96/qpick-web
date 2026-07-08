import type { Metadata } from 'next';

import FAQ from '@/pageComponents/FAQ';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description: 'Find answers to common questions about Q Pick tours, vehicles, bookings, and policies.',
  path: '/faq',
});

export default function FAQPage() {
  return <FAQ />;
}

