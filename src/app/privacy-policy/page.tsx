import type { Metadata } from 'next';

import PrivacyPolicy from '@/pageComponents/PrivacyPolicy';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Read how Q Pick collects, uses, and protects your personal information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

