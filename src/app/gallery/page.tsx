import type { Metadata } from 'next';

import Gallery from '@/pageComponents/Gallery';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Gallery',
  description: 'View travel highlights, destinations, and experiences from Q Pick tours across Sri Lanka.',
  path: '/gallery',
});

export default function GalleryPage() {
  return <Gallery />;
}

