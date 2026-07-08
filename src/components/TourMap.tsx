"use client";

import { useEffect, useMemo } from "react";
import L, { type LatLngTuple } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer, ZoomControl, useMap } from "react-leaflet";

export interface TourMapPoint {
  name: string;
  description?: string;
  coordinates: { lat: number; lng: number };
  stopNumber: number;
}

interface TourMapProps {
  points: TourMapPoint[];
  height?: number | string;
  showRouteLine?: boolean;
}

const OFFICE_COORDINATES: LatLngTuple = [7.2521389, 79.8424167];
const OFFICE_NAME = "Q Pick Head Office";
const OFFICE_DESCRIPTION = "Our main office location";
const OFFICE_PLACE_URL =
  "https://www.google.com/maps/place/7%C2%B015%2707.7%22N+79%C2%B050%2732.7%22E/@7.252065,79.842369,67m/data=!3m1!1e3!4m4!3m3!8m2!3d7.2521389!4d79.8424167?entry=tts";
const OFFICE_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7.2521389,79.8424167";

function FitToPoints({ positions }: { positions: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;

    if (positions.length === 1) {
      map.setView(positions[0], 10, { animate: true });
      return;
    }

    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, {
      padding: [36, 36],
      animate: true,
      duration: 0.9,
    });
  }, [map, positions]);

  return null;
}

const createStopIcon = (stopNumber: number) =>
  L.divIcon({
    className: "qpick-stop-marker-wrapper",
    html: `<div class=\"qpick-stop-marker\">${stopNumber}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

const officeIcon = L.divIcon({
  className: "qpick-office-marker-wrapper",
  html: '<div class="qpick-office-marker">HQ</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

export default function TourMap({ points, height = 340, showRouteLine = true }: TourMapProps) {
  const positions = useMemo<LatLngTuple[]>(
    () => points.map((point) => [point.coordinates.lat, point.coordinates.lng]),
    [points]
  );

  const fitPositions = useMemo<LatLngTuple[]>(() => [...positions, OFFICE_COORDINATES], [positions]);

  const center = positions[0] ?? ([7.8731, 80.7718] as LatLngTuple);

  if (!points.length) {
    return (
      <div className="rounded-2xl border border-[#E9ECEF] bg-slate-50 p-4 text-sm text-[#6C757D] dark:border-gray-800 dark:bg-[#0B1120]/40 dark:text-gray-300">
        Map data is not available for this route.
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={8}
        zoomControl={false}
        scrollWheelZoom
        className="h-full w-full"
        style={{ height, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="topright" />
        <FitToPoints positions={fitPositions} />

        {showRouteLine && positions.length > 1 ? (
          <Polyline positions={positions} pathOptions={{ color: "#446FB7", weight: 5, opacity: 0.88 }} />
        ) : null}

        {points.map((point) => (
          <Marker
            key={`${point.stopNumber}-${point.name}-${point.coordinates.lat}-${point.coordinates.lng}`}
            position={[point.coordinates.lat, point.coordinates.lng]}
            icon={createStopIcon(point.stopNumber)}
          >
            <Popup>
              <div className="min-w-[180px] pr-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#446FB7]">
                  Stop {point.stopNumber}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">{point.name}</p>
                {point.description ? (
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{point.description}</p>
                ) : null}
              </div>
            </Popup>
          </Marker>
        ))}

        <Marker position={OFFICE_COORDINATES} icon={officeIcon}>
          <Popup>
            <div className="min-w-[210px] pr-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#446FB7]">Office</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{OFFICE_NAME}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{OFFICE_DESCRIPTION}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={OFFICE_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-[#446FB7] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#375c99]"
                >
                  Get Directions
                </a>
                <a
                  href={OFFICE_PLACE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[#446FB7] px-3 py-1.5 text-[11px] font-semibold text-[#446FB7] transition hover:bg-[#446FB7] hover:text-white"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}