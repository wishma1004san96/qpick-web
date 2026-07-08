"use client";

import dynamic from "next/dynamic";

const RouteMapDynamic = dynamic(() => import("./route-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[340px] rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
  ),
});

export type RouteData = {
  stops: Array<{
    name: string;
    description?: string;
    coordinates: { lat: number; lng: number };
    stopNumber: number;
  }>;
};

export interface RouteMapClientProps {
  stops: string[];
  serverRouteData: RouteData | null;
  heightPx?: number;
}

export default function RouteMapClient(props: RouteMapClientProps) {
  return <RouteMapDynamic {...props} />;
}
