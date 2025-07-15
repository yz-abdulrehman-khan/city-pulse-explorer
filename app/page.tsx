"use client";

import { useState, useCallback } from "react";
import { SearchForm } from "@/components/home/search-form";
import { EventCard, EventCardSkeleton } from "@/components/home/event-card";
import { findEventsAction } from "./actions";
import type { TicketmasterEvent } from "@/lib/ticketmaster";
import { PartyPopper } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<TicketmasterEvent[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    async (values: { keyword: string; city: string }) => {
      setIsSearching(true);
      setEvents(null); // Clear previous results
      const foundEvents = await findEventsAction(values.keyword, values.city);
      setEvents(foundEvents);
      setIsSearching(false);
    },
    []
  );

  return (
    <>
      <section className="grid items-center gap-8 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Discover Events Happening Around You
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Your ultimate guide to local concerts, sports, theater, and more.
            Find your next experience with City Pulse.
          </p>
        </div>
        <div className="w-full">
          <SearchForm onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </section>

      <section className="pb-12">
        {/* Initial State Message */}
        {!isSearching && events === null && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <PartyPopper className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
              Find your next experience
            </h3>
            <p className="text-muted-foreground">
              Start by searching for an event, artist, or city above.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Results State */}
        {!isSearching && events && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isSearching && events && events.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No events found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
