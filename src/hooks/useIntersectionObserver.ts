'use client';

import { useRef } from 'react';

export function useIntersectionObserver() {
  const elementRef = useRef<HTMLElement | null>(null);
  return [elementRef, true] as const;
}