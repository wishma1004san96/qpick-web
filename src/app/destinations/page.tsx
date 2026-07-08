import type { Metadata } from 'next';

import Destinations from '@/pageComponents/Destinations';
import { getDestinationsForListing } from '@/data/destinations-data';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Destinations',
  description: 'Browse top destinations in Sri Lanka and plan your next trip with Q Pick.',
  path: '/destinations',
});

export default function DestinationsPage() {
  const destinations = getDestinationsForListing().sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    return bFeatured - aFeatured || a.name.localeCompare(b.name);
  });

  return <Destinations destinations={destinations} />;
}

