import fs from 'fs';
import path from 'path';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const REGION_SUFFIX = ', Sri Lanka';

export async function getRouteData(stops: string[]) {
  if (!stops || stops.length === 0) return null;

  // Cache key = joined stop names with whitespace removed
  const cacheKey = stops.join('-').replace(/\s+/g, '');
  const cacheDir = path.join(process.cwd(), 'src', 'data', 'maps-cache');
  const cachePath = path.join(cacheDir, `${cacheKey}.json`);

  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

  // Return cached file if it exists and is not older than 30 days
  if (fs.existsSync(cachePath)) {
    const isExpired = (Date.now() - fs.statSync(cachePath).mtimeMs) > THIRTY_DAYS_MS;
    if (!isExpired) {
      try { return JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch { /* corrupted — fall through */ }
    }
  }

  // Build Directions API URL
  const encode = (s: string) => encodeURIComponent(`${s}${REGION_SUFFIX}`);

  if (stops.length === 1) {
    const query = encode(stops[0]);
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${query}&destination=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    try {
      const data = await fetch(url).then(r => r.json());
      if (data.status === 'OK' && data.routes[0]?.legs[0]) {
        const location = data.routes[0].legs[0].start_location;
        const cleanData = { singleMarker: location };
        fs.writeFileSync(cachePath, JSON.stringify(cleanData), 'utf8');
        return cleanData;
      }
    } catch {
      console.error('Route cache: Directions API fetch failed for single stop');
    }
    return null;
  }
  const origin = encode(stops[0]);
  const destination = encode(stops[stops.length - 1]);
  const waypoints = stops.slice(1, -1).map(encode).join('|');
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  try {
    const data = await fetch(url).then(r => r.json());

    if (data.status === 'OK') {
      const route = data.routes[0];

      // Strip down to only what the client needs
      const cleanData = {
        polyline: route.overview_polyline.points,
        // Step-level polylines follow road curves precisely at high zoom
        detailedPolylines: route.legs.flatMap(
          (leg: { steps: { polyline: { points: string } }[] }) =>
            leg.steps.map((step) => step.polyline.points)
        ),
        legs: route.legs.map((leg: {
          start_location: { lat: number; lng: number };
          end_location: { lat: number; lng: number };
        }) => ({
          start_location: leg.start_location,
          end_location: leg.end_location,
        })),
      };

      fs.writeFileSync(cachePath, JSON.stringify(cleanData), 'utf8');
      return cleanData;
    }
  } catch {
    console.error('Route cache: Directions API fetch failed');
  }

  return null;
}
