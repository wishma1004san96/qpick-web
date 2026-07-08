import type { Metadata } from 'next';

import TailorMadeTours from '@/pageComponents/TailorMadeTours';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Tailor Made Tours',
  description: 'Request a fully customized Sri Lanka itinerary with Q Pick based on your dates, interests, and travel style.',
  path: '/tailor-made-tours',
});

export default function TailorMadeToursPage() {
  return <TailorMadeTours />;
}

