"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { getEventsByIds } from "@/app/actions";
import type { TicketmasterEvent } from "@/lib/ticketmaster";
import { EventCard, EventCardSkeleton } from "@/components/home/event-card";
import { HeartCrack } from "lucide-react";

export function FavoriteEventsList() {
  const { favorites } = useFavorites();
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to true whenever favorites change
    setIsLoading(true);
    if (favorites.length > 0) {
      getEventsByIds(favorites)
        .then(setEvents)
        .finally(() => setIsLoading(false));
    } else {
      // If there are no favorites, clear the events list and stop loading
      setEvents([]);
      setIsLoading(false);
    }
  }, [favorites]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Show skeletons based on number of favorites for better UX */}
        {Array.from({ length: favorites.length || 3 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <HeartCrack className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          No Favorite Events
        </h3>
        <p className="text-muted-foreground">
          You haven't saved any events yet. Start exploring!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
