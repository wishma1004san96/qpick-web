import fs from 'fs';
import path from 'path';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const REGION_SUFFIX = ', Sri Lanka';

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

function toSafeFileName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

async function geocodePlace(query: string): Promise<{ lat: number; lng: number } | null> {
  const encQuery = encodeURIComponent(query);
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encQuery}&destination=${encQuery}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  try {
    const data = await fetch(url).then(r => r.json());
    if (data.status === 'OK' && data.routes[0]?.legs[0]) {
      return data.routes[0].legs[0].start_location;
    }
  } catch (error) {
    console.error('Highlights cache: Directions API geocoding failed:', error);
  }
  return null;
}

export async function getHighlightsMapData(params: {
  slug: string;               // used as the cache file name
  locationName: string;       // appended to geocode queries for accuracy
  highlights: HighlightInput[];
}): Promise<{ points: HighlightPoint[] } | null> {
  const { slug, locationName, highlights } = params;

  if (!highlights?.length) return null;

  const cacheDir = path.join(process.cwd(), 'src', 'data', 'maps-cache', 'highlights');
  const cachePath = path.join(cacheDir, `${toSafeFileName(slug)}.json`);

  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

  if (fs.existsSync(cachePath)) {
    const isExpired = (Date.now() - fs.statSync(cachePath).mtimeMs) > THIRTY_DAYS_MS;
    if (!isExpired) {
      try { return JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch { /* corrupted — fall through */ }
    }
  }

  const points: HighlightPoint[] = [];

  for (const highlight of highlights) {
    if (highlight.coordinates) {
      // Already has coordinates — no API call needed
      points.push({ title: highlight.title, description: highlight.description, coordinates: highlight.coordinates });
      continue;
    }

    const geocoded = await geocodePlace(`${highlight.title}, ${locationName}${REGION_SUFFIX}`);
    if (geocoded) {
      points.push({ title: highlight.title, description: highlight.description, coordinates: geocoded });
    }
  }

  const payload = { points };
  fs.writeFileSync(cachePath, JSON.stringify(payload), 'utf8');
  return payload;
}
