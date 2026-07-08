import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import DestinationDetails from '@/pageComponents/DestinationDetails';
import { getDestinationBySlug, getDestinationSlugs } from '@/data/destinations-data';
import { buildMetadata } from '@/utils/seo';
import { getHighlightsMapData } from '@/lib/highlights-cache';

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return buildMetadata({
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
      path: `/destinations/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${destination.name} Destination Guide`,
    description: destination.shortDescription,
    path: `/destinations/${slug}`,
    images: destination.heroImage || destination.image ? [destination.heroImage || destination.image] : undefined,
    type: 'article',
  });
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) notFound();

  const highlightInputs = (destination.highlightsDetailed ?? []).map(h => ({
    title: h.title,
    description: h.description,
    coordinates: h.coordinates,
  }));

  const highlightsData = getHighlightsMapData({
    slug: destination.slug,
    locationName: destination.name,
    highlights: highlightInputs,
    fallbackCoordinates: destination.coordinates,
  });

  return <DestinationDetails destination={destination} highlightsData={highlightsData} />;
}
