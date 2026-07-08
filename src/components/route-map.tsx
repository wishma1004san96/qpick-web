"use client";

import { useEffect, useRef, useState } from "react";
import type { RouteMapClientProps } from "./route-map-client";

declare global {
  interface Window { google?: typeof google; }
}

export default function RouteMap({ stops, serverRouteData, heightPx = 340 }: RouteMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const projectionOverlayRef = useRef<google.maps.OverlayView | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const markerListenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const mapListenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const routePathRef = useRef<google.maps.Polyline | null>(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [activePopup, setActivePopup] = useState<{
    label: string;
    locationName: string;
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
    if (routePathRef.current) {
      routePathRef.current.setMap(null);
      routePathRef.current = null;
    }
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
    if (!scriptLoaded || !window.google || !mapInstanceRef.current || !serverRouteData) return;

    const map = mapInstanceRef.current;
    clearMapArtifacts();

    let path: google.maps.LatLng[] = [];
    if (serverRouteData.detailedPolylines?.length) {
      serverRouteData.detailedPolylines.forEach((enc) => {
        path = path.concat(window.google!.maps.geometry.encoding.decodePath(enc));
      });
    } else if (serverRouteData.polyline) {
      path = window.google!.maps.geometry.encoding.decodePath(serverRouteData.polyline);
    }

    if (!path.length && !serverRouteData.singleMarker) return;

    if (path.length) {
      const routePath = new window.google!.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#446FB7",
        strokeOpacity: 0.9,
        strokeWeight: 6,
      });
      routePath.setMap(map);
      routePathRef.current = routePath;

      const bounds = new window.google!.maps.LatLngBounds();
      routePath.getPath().forEach((latLng) => bounds.extend(latLng));
      map.fitBounds(bounds);
    }

    const createMarker = (position: google.maps.LatLngLiteral, label: string, locationName: string) => {
      const pinEl = document.createElement("div");
      pinEl.style.cssText = [
        "width:32px", "height:32px", "border-radius:50% 50% 50% 0",
        "background:#446FB7", "border:2px solid white",
        "display:flex", "align-items:center", "justify-content:center",
        "transform:rotate(-45deg)", "box-shadow:0 2px 8px rgba(0,0,0,0.3)",
        "cursor:pointer",
      ].join(";");
      const labelEl = document.createElement("span");
      labelEl.style.cssText = "transform:rotate(45deg);color:white;font-size:13px;font-weight:700;line-height:1;";
      labelEl.textContent = label;
      pinEl.appendChild(labelEl);

      const marker = new window.google!.maps.marker.AdvancedMarkerElement({
        position, map, title: locationName, content: pinEl,
      });
      markersRef.current.push(marker);

      const clickListener = marker.addListener("gmp-click", () => {
        const projection = projectionOverlayRef.current?.getProjection();
        if (!projection || !mapRef.current) return setActivePopup(null);

        const rawPos = marker.position;
        if (!rawPos) return setActivePopup(null);

        const latLng = rawPos instanceof window.google!.maps.LatLng
          ? rawPos
          : new window.google!.maps.LatLng(
              (rawPos as google.maps.LatLngLiteral).lat,
              (rawPos as google.maps.LatLngLiteral).lng
            );

        const pixel = projection.fromLatLngToContainerPixel(latLng);
        if (!pixel) return setActivePopup(null);

        const { clientWidth: w, clientHeight: h } = mapRef.current;
        setActivePopup({
          label,
          locationName,
          x: Math.min(Math.max(pixel.x, 24), Math.max(24, w - 24)),
          y: Math.min(Math.max(pixel.y, 24), Math.max(24, h - 24)),
          placeAbove: pixel.y > 120,
        });
      });
      markerListenersRef.current.push(clickListener);
    };

    if (serverRouteData.singleMarker) {
      createMarker(serverRouteData.singleMarker, "A", stops[0] ?? "Destination");
      map.setCenter(serverRouteData.singleMarker);
      map.setZoom(10);
    } else if (serverRouteData.legs && serverRouteData.legs.length > 0) {
      createMarker(serverRouteData.legs[0].start_location, "A", stops[0] ?? "Start");
      serverRouteData.legs.forEach((leg, i) => {
        createMarker(leg.end_location, String.fromCharCode(66 + i), stops[i + 1] ?? `Stop ${i + 1}`);
      });
    }

    mapListenersRef.current.push(
      map.addListener("click", () => setActivePopup(null)),
      map.addListener("dragstart", () => setActivePopup(null)),
      map.addListener("zoom_changed", () => setActivePopup(null)),
      map.addListener("center_changed", () => setActivePopup(null))
    );

    return () => { clearMapArtifacts(); };
  }, [scriptLoaded, stops, serverRouteData]);

  if (!stops.length) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E9ECEF] dark:border-gray-800">
      <div className="relative w-full" style={{ height: heightPx }}>
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
              Stop {activePopup.label}
            </p>
            <p className="mt-1 pr-2 text-sm font-bold leading-snug text-slate-900">{activePopup.locationName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
