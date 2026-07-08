import type { Metadata } from 'next';

import BlogPage from '@/pageComponents/BlogPage';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Travel Blog',
  description: 'Read Q Pick travel guides, destination stories, and practical tips for exploring Sri Lanka.',
  path: '/blog',
});

export default function BlogListingPage() {
  return <BlogPage />;
}

