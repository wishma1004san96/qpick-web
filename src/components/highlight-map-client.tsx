"use client";

import dynamic from "next/dynamic";
import type { HighlightPoint } from "@/lib/highlights-cache";

const HighlightMapDynamic = dynamic(() => import("./highlight-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
  ),
});

export interface HighlightMapClientProps {
  points: HighlightPoint[];
}

export default function HighlightMapClient(props: HighlightMapClientProps) {
  return <HighlightMapDynamic {...props} />;
}
