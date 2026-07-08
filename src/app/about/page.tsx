import type { Metadata } from 'next';

import AboutUs from '@/pageComponents/AboutUs';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'Learn about Q Pick, our team, and our mission to deliver trusted chauffeur and tour services across Sri Lanka.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutUs />;
}

