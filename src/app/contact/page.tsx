import type { Metadata } from 'next';

import ContactUs from '@/pageComponents/ContactUs';
import { buildMetadata } from '@/utils/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Contact Q Pick for chauffeur bookings, custom tours, and airport transfer inquiries in Sri Lanka.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactUs />;
}

