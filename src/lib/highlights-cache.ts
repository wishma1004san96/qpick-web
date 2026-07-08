type HighlightInput = {
  title: string;
  description?: string;
  coordinates?: { lat: number; lng: number };
};

export type HighlightPoint = {
  title: string;
  description?: string;
  coordinates: { lat: number; lng: number };
};

export function getHighlightsMapData(params: {
  slug: string;
  locationName: string;
  highlights: HighlightInput[];
  fallbackCoordinates?: { lat: number; lng: number };
}): { points: HighlightPoint[] } | null {
  const { highlights, fallbackCoordinates } = params;

  if (!highlights?.length) return null;

  const points = highlights
    .map((highlight, index) => {
      const baseCoordinates = highlight.coordinates ?? fallbackCoordinates;
      if (!baseCoordinates) return null;

      // Spread fallback points slightly so multiple highlights can still be clicked.
      const jitter = highlight.coordinates
        ? { lat: 0, lng: 0 }
        : {
            lat: Math.sin(index * 1.7) * 0.0004,
            lng: Math.cos(index * 1.7) * 0.0004,
          };

      return {
        title: highlight.title,
        description: highlight.description,
        coordinates: {
          lat: baseCoordinates.lat + jitter.lat,
          lng: baseCoordinates.lng + jitter.lng,
        },
      };
    })
    .filter(Boolean) as HighlightPoint[];

  return points.length ? { points } : null;
}
