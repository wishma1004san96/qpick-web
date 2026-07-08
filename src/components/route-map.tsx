"use client";

import TourMap, { type TourMapPoint } from "./TourMap";
import type { RouteMapClientProps } from "./route-map-client";

export default function RouteMap({ stops, serverRouteData, heightPx = 340 }: RouteMapClientProps) {
  if (!stops.length) return null;

  const points: TourMapPoint[] = (serverRouteData?.stops ?? []).filter(
    (stop) => typeof stop.coordinates?.lat === "number" && typeof stop.coordinates?.lng === "number"
  );

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800">
      <div className="relative w-full" style={{ height: heightPx }}>
        <TourMap points={points} height="100%" showRouteLine={points.length > 1} />
      </div>
    </div>
  );
}
