"use client";

import { useEffect, useRef, useState } from "react";
import type { HighlightMapClientProps } from "./highlight-map-client";
import type { HighlightPoint } from "@/lib/highlights-cache";

declare global {
  interface Window { google?: typeof google; }
}

function offsetPointsForOverlap(points: HighlightPoint[]) {
  const groups = new Map<string, HighlightPoint[]>();

  points.forEach((point) => {
    // 5-decimal precision groups markers that are effectively at the same spot
    const key = `${point.coordinates.lat.toFixed(5)}:${point.coordinates.lng.toFixed(5)}`;
    const group = groups.get(key) ?? [];
    group.push(point);
    groups.set(key, group);
  });

  const result: HighlightPoint[] = [];
  groups.forEach((group) => {
    if (group.length === 1) { result.push(group[0]); return; }

    const radius = 0.00025; // ~27 metres
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const projectionOverlayRef = useRef<google.maps.OverlayView | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const markerListenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const mapListenersRef = useRef<google.maps.MapsEventListener[]>([]);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [activePopup, setActivePopup] = useState<{
    index: number;
    title: string;
    description?: string;
    x: number;
    y: number;
    placeAbove: boolean;
  } | null>(null);

  const clearMapArtifacts = () => {
    markerListenersRef.current.forEach((l) => l.remove());
    markerListenersRef.current = [];
    mapListenersRef.current.forEach((l) => l.remove());
    mapListenersRef.current = [];
    markersRef.current.forEach((marker) => { marker.map = null; });
    markersRef.current = [];
    queueMicrotask(() => setActivePopup(null));
  };

  useEffect(() => {
    return () => {
      clearMapArtifacts();
      projectionOverlayRef.current?.setMap(null);
      projectionOverlayRef.current = null;
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window.google?.maps?.Map === "function") {
      queueMicrotask(() => setScriptLoaded(true));
      return;
    }

    let mounted = true;
    const callbackName = "__googleMapsReady";
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry,marker&loading=async&callback=${callbackName}`;

    const notify = () => { if (mounted) setScriptLoaded(true); };
    const w = window as unknown as Record<string, unknown>;
    const prev = w[callbackName] as (() => void) | undefined;
    w[callbackName] = prev ? () => { prev(); notify(); } : notify;

    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.google || !mapRef.current || mapInstanceRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 7.8731, lng: 80.7718 },
      zoom: 7,
      mapTypeControl: false,
      streetViewControl: false,
      gestureHandling: "cooperative",
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
    });

    const overlay = new window.google.maps.OverlayView();
    overlay.onAdd = () => {};
    overlay.draw = () => {};
    overlay.onRemove = () => {};
    overlay.setMap(map);

    mapInstanceRef.current = map;
    projectionOverlayRef.current = overlay;

    return () => {
      overlay.setMap(null);
      projectionOverlayRef.current = null;
      mapInstanceRef.current = null;
    };
  }, [scriptLoaded]);

  useEffect(() => {
    if (!scriptLoaded || typeof window.google?.maps?.Map !== "function" || !mapInstanceRef.current || points.length === 0) return;

    const map = mapInstanceRef.current;
    clearMapArtifacts();

    const adjustedPoints = offsetPointsForOverlap(points);
    const bounds = new window.google.maps.LatLngBounds();

    adjustedPoints.forEach((point, index) => {
      const pin = document.createElement("div");
      pin.style.cssText = [
        "width:32px", "height:32px", "border-radius:50% 50% 50% 0",
        "background:#446FB7", "border:2px solid white",
        "display:flex", "align-items:center", "justify-content:center",
        "transform:rotate(-45deg)", "box-shadow:0 2px 8px rgba(0,0,0,0.3)",
        "cursor:pointer",
      ].join(";");
      const labelEl = document.createElement("span");
      labelEl.style.cssText = "transform:rotate(45deg);color:white;font-size:13px;font-weight:700;line-height:1;";
      labelEl.textContent = String(index + 1);
      pin.appendChild(labelEl);

      const marker = new window.google!.maps.marker.AdvancedMarkerElement({
        position: point.coordinates,
        map,
        title: point.title,
        content: pin,
      });
      markersRef.current.push(marker);

      const clickListener = marker.addListener("gmp-click", () => {
        const projection = projectionOverlayRef.current?.getProjection();
        if (!projection || !mapRef.current) return setActivePopup(null);

        const pixel = projection.fromLatLngToContainerPixel(
          new window.google!.maps.LatLng(point.coordinates.lat, point.coordinates.lng)
        );
        if (!pixel) return setActivePopup(null);

        const { clientWidth: w, clientHeight: h } = mapRef.current;
        setActivePopup({
          index: index + 1,
          title: point.title,
          description: point.description,
          x: Math.min(Math.max(pixel.x, 24), Math.max(24, w - 24)),
          y: Math.min(Math.max(pixel.y, 24), Math.max(24, h - 24)),
          placeAbove: pixel.y > 130,
        });
      });
      markerListenersRef.current.push(clickListener);
      bounds.extend(point.coordinates);
    });

    mapListenersRef.current.push(
      map.addListener("click", () => setActivePopup(null)),
      map.addListener("dragstart", () => setActivePopup(null)),
      map.addListener("zoom_changed", () => setActivePopup(null)),
      map.addListener("center_changed", () => setActivePopup(null))
    );

    if (!bounds.isEmpty()) map.fitBounds(bounds, 60);

    return () => { clearMapArtifacts(); };
  }, [points, scriptLoaded]);

  if (!points.length) return null;

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {activePopup && (
        <div
          className={`absolute z-20 w-[240px] max-w-[calc(100%-16px)] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl ${
            activePopup.placeAbove
              ? "-translate-x-1/2 -translate-y-[calc(100%+14px)]"
              : "-translate-x-1/2 translate-y-3"
          }`}
          style={{ left: `${activePopup.x}px`, top: `${activePopup.y}px` }}
        >
          <button
            type="button"
            onClick={() => setActivePopup(null)}
            aria-label="Close popup"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            ×
          </button>
          <p className="pr-8 text-xs font-semibold uppercase tracking-widest text-[#446FB7]">
            Point {activePopup.index}
          </p>
          <p className="mt-1 pr-2 text-sm font-bold leading-snug text-slate-900">{activePopup.title}</p>
          {activePopup.description && (
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{activePopup.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
