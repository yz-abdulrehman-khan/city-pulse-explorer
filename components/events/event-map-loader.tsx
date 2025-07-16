"use client";

import dynamic from "next/dynamic";

// Dynamically import the map component with ssr: false HERE, in a Client Component
const EventMap = dynamic(
  () => import("@/components/events/event-map").then((mod) => mod.EventMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse rounded-lg bg-muted" />
    ),
  }
);

interface EventMapLoaderProps {
  position: [number, number];
  venueName: string;
}

// This component acts as a client-side bridge to load the map
export function EventMapLoader({ position, venueName }: EventMapLoaderProps) {
  return <EventMap position={position} venueName={venueName} />;
}
