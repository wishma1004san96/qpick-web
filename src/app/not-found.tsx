import type { Metadata } from 'next';

import NotFound from '@/pageComponents/NotFound';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  path: '/not-found',
  noIndex: true,
});

export default function NotFoundPage() {
  return <NotFound />;
}
