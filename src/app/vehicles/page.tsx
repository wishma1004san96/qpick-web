import type { Metadata } from 'next';

import Vehicles from '@/pageComponents/Vehicles';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Vehicles',
  description: 'Choose from Q Pick sedans, SUVs, KDH vans, and buses for comfortable travel in Sri Lanka.',
  path: '/vehicles',
});

export default function VehiclesPage() {
  return <Vehicles />;
}

