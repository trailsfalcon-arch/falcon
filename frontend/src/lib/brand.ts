'use client';

import { useEffect, useState } from 'react';

/**
 * The business this CRM runs for, from Settings → Company profile
 * (GET /api/brand). Screens read the brand here instead of hardcoding a name,
 * so a licensed install is rebranded from Settings.
 *
 * The last value is cached in localStorage so the name renders immediately;
 * the fetch then refreshes it.
 */
export interface PublicBrand {
  brandName: string;
  legalName: string;
  tagline: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  host: string;
  landerUrl: string;
  operatingRegion: string;
  logoUrl: string;
  instagramUrl: string;
  facebookUrl: string;
}

export const DEFAULT_BRAND: PublicBrand = {
  brandName: 'Falcon Trails',
  legalName: 'Falcon Trails',
  tagline: '',
  city: 'Srinagar',
  state: 'Jammu & Kashmir',
  country: 'India',
  phone: '',
  whatsapp: '',
  email: 'info@falcontrails.in',
  website: 'https://falcontrails.in',
  host: 'falcontrails.in',
  landerUrl: 'https://go.falcontrails.in',
  operatingRegion: 'Kashmir, Ladakh & Jammu',
  logoUrl: '',
  instagramUrl: '',
  facebookUrl: '',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';
const CACHE_KEY = 'crm.brand';
let current: PublicBrand | null = null;
let inflight: Promise<PublicBrand> | null = null;
const listeners = new Set<(b: PublicBrand) => void>();

function readCache(): PublicBrand | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? { ...DEFAULT_BRAND, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

function publish(b: PublicBrand) {
  current = b;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(b));
  } catch {
    /* storage unavailable: the fetch still works */
  }
  listeners.forEach((fn) => fn(b));
}

/** Current brand without waiting (cache or default). */
export function getBrand(): PublicBrand {
  if (current) return current;
  if (typeof window !== 'undefined') current = readCache();
  return current ?? DEFAULT_BRAND;
}

/** Fetch the brand from the backend. `force` bypasses the in-memory copy. */
export function loadBrand(force = false): Promise<PublicBrand> {
  if (inflight && !force) return inflight;
  inflight = fetch(`${API_BASE}/brand`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((b: Partial<PublicBrand>) => {
      const next = { ...DEFAULT_BRAND, ...b };
      publish(next);
      return next;
    })
    .catch(() => getBrand());
  return inflight;
}

export function useBrand(): PublicBrand {
  const [b, setB] = useState<PublicBrand>(DEFAULT_BRAND);
  useEffect(() => {
    setB(getBrand());
    listeners.add(setB);
    void loadBrand();
    return () => {
      listeners.delete(setB);
    };
  }, []);
  return b;
}
