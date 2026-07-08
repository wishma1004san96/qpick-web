import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { tours } from '@/data/tours';
import TourDetails, { slugifyTourTitle, getTourDestinations } from '@/pageComponents/TourDetails';
import { buildMetadata } from '@/utils/seo';
import { getRouteData } from '@/lib/route-cache';

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: slugifyTourTitle(tour.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => slugifyTourTitle(t.title) === slug);

  if (!tour) {
    return buildMetadata({
      title: 'Tour Not Found',
      description: 'The requested tour package could not be found.',
      path: `/tours/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: tour.title,
    description: tour.shortDescription,
    path: `/tours/${slug}`,
    images: tour.image ? [tour.image] : undefined,
    type: 'article',
  });
}

export default async function TourDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tours.find((t) => slugifyTourTitle(t.title) === slug);

  if (!tour) notFound();

  const destinations = getTourDestinations(tour);
  const stops = destinations.map(d => d.name);
  const routeData = await getRouteData(stops);

  return <TourDetails tour={tour} routeData={routeData} />;
}
