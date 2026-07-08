"use client";

import dynamic from "next/dynamic";

const RouteMapDynamic = dynamic(() => import("./route-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[340px] rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
  ),
});

export type RouteData = {
  polyline?: string;
  detailedPolylines?: string[];
  legs?: Array<{
    start_location: { lat: number; lng: number };
    end_location: { lat: number; lng: number };
  }>;
  singleMarker?: { lat: number; lng: number };
};

export interface RouteMapClientProps {
  stops: string[];
  serverRouteData: RouteData | null;
  heightPx?: number;
}

export default function RouteMapClient(props: RouteMapClientProps) {
  return <RouteMapDynamic {...props} />;
}
