'use client';

import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

const OFFICE_COORDINATES: [number, number] = [7.2521389, 79.8424167];
const OFFICE_MAPS_URL =
  'https://www.google.com/maps/place/7%C2%B015%2707.7%22N+79%C2%B050%2732.7%22E/@7.252065,79.842369,67m/data=!3m1!1e3!4m4!3m3!8m2!3d7.2521389!4d79.8424167?entry=tts';
const OFFICE_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=7.2521389,79.8424167';

export default function ContactOfficeMap() {
  const officeIcon = useMemo(
    () =>
      L.divIcon({
        className: 'qpick-office-marker-wrapper',
        html: '<div class="qpick-office-marker">HQ</div>',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      }),
    []
  );

  return (
    <MapContainer
      center={OFFICE_COORDINATES}
      zoom={16}
      zoomControl={false}
      scrollWheelZoom
      className="h-[300px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />

      <Marker position={OFFICE_COORDINATES} icon={officeIcon}>
        <Popup>
          <div className="min-w-[210px] pr-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#446FB7]">Office</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Q Pick Head Office</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">Our main office location</p>
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
                href={OFFICE_MAPS_URL}
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
  );
}
