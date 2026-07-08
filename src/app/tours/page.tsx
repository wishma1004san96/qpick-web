import type { Metadata } from 'next';

import ToursPage from '@/pageComponents/Tours';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Tours',
  description: 'Explore guided Sri Lanka tour packages by Q Pick, from day trips to multi-day adventures.',
  path: '/tours',
});

export default function ToursRoute() {
  return <ToursPage />;
}

