"use client";

import { useState, useCallback } from "react";
import { SearchForm } from "@/components/home/search-form";
import { EventCard, EventCardSkeleton } from "@/components/home/event-card";
import { findEventsAction } from "./actions";
import type { TicketmasterResponse } from "@/lib/ticketmaster";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchResult, setSearchResult] = useState<TicketmasterResponse | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentQuery, setCurrentQuery] = useState({ keyword: "", city: "" });

  const handleSearch = useCallback(
    async (values: { keyword: string; city: string }, page = 0) => {
      setIsSearching(true);
      // Don't set result to null here, it causes a flash of the empty state
      // The loading state will cover the old results
      setCurrentPage(page);
      setCurrentQuery(values);

      const result = await findEventsAction(values.keyword, values.city, page);
      setSearchResult(result);
      setIsSearching(false);
      window.scrollTo(0, 0); // Scroll to top on new search
    },
    []
  ); // FIX: Removed empty dependency array, useCallback is not strictly needed here.

  const handlePageChange = (newPage: number) => {
    handleSearch(currentQuery, newPage);
  };

  const events = searchResult?._embedded?.events;
  const pageInfo = searchResult?.page;

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
          <SearchForm
            onSearch={(values) => handleSearch(values, 0)}
            isSearching={isSearching}
          />
        </div>
      </section>

      <section className="pb-12">
        {/* Initial State Message */}
        {!isSearching && searchResult === null && (
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
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {/* Pagination Controls */}
            {pageInfo && pageInfo.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-4">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage + 1} of {pageInfo.totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= pageInfo.totalPages - 1}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isSearching && searchResult && (!events || events.length === 0) && (
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
