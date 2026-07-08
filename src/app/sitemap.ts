import type { MetadataRoute } from 'next';

import { blogs } from '@/data/blogs';
import { getDestinationSlugs } from '@/data/destinations-data';
import { tours } from '@/data/tours';
import { getBlogSlug } from '@/utils/blogSlug';
import { SITE_URL } from '@/utils/seo';
import { slugifyTourTitle } from '@/pageComponents/TourDetails';

const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/destinations',
  '/faq',
  '/gallery',
  '/privacy-policy',
  '/tailor-made-tours',
  '/terms',
  '/tours',
  '/vehicles',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));

  const destinationEntries: MetadataRoute.Sitemap = getDestinationSlugs().map((slug) => ({
    url: `${SITE_URL}/destinations/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${getBlogSlug(blog)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${SITE_URL}/tours/${slugifyTourTitle(tour.title)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...destinationEntries, ...blogEntries, ...tourEntries];
}
