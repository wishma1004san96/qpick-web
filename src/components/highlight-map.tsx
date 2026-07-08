"use client";

import TourMap, { type TourMapPoint } from "./TourMap";
import type { HighlightMapClientProps } from "./highlight-map-client";
import type { HighlightPoint } from "@/lib/highlights-cache";

function offsetPointsForOverlap(points: HighlightPoint[]) {
  const groups = new Map<string, HighlightPoint[]>();

  points.forEach((point) => {
    const key = `${point.coordinates.lat.toFixed(5)}:${point.coordinates.lng.toFixed(5)}`;
    const group = groups.get(key) ?? [];
    group.push(point);
    groups.set(key, group);
  });

  const result: HighlightPoint[] = [];
  groups.forEach((group) => {
    if (group.length === 1) {
      result.push(group[0]);
      return;
    }

    const radius = 0.00025;
    group.forEach((point, index) => {
      const angle = (index / group.length) * Math.PI * 2;
      result.push({
        ...point,
        coordinates: {
          lat: point.coordinates.lat + Math.sin(angle) * radius,
          lng: point.coordinates.lng + Math.cos(angle) * radius,
        },
      });
    });
  });

  return result;
}

export default function HighlightMap({ points }: HighlightMapClientProps) {
  if (!points.length) return null;

  const adjustedPoints = offsetPointsForOverlap(points);
  const mapPoints: TourMapPoint[] = adjustedPoints.map((point, index) => ({
    name: point.title,
    description: point.description,
    coordinates: point.coordinates,
    stopNumber: index + 1,
  }));

  return <TourMap points={mapPoints} height="100%" showRouteLine={false} />;
}
