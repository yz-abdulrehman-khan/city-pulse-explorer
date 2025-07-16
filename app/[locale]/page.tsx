"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { SearchForm } from "@/components/home/search-form";
import { EventCard, EventCardSkeleton } from "@/components/home/event-card";
import { findEventsAction } from "../actions";
import type { TicketmasterResponse } from "@/lib/ticketmaster";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const t = useTranslations("Home");

  const [searchResult, setSearchResult] = useState<TicketmasterResponse | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentQuery, setCurrentQuery] = useState({ keyword: "", city: "" });

  const handleSearch = useCallback(
    async (values: { keyword: string; city: string }, page = 0) => {
      setIsSearching(true);
      setCurrentPage(page);
      setCurrentQuery(values);

      const result = await findEventsAction(values.keyword, values.city, page);
      setSearchResult(result);
      setIsSearching(false);
      window.scrollTo(0, 0);
    },
    []
  );

  const handlePageChange = (newPage: number) => {
    handleSearch(currentQuery, newPage);
  };

  const events = searchResult?._embedded?.events;
  const pageInfo = searchResult?.page;

  return (
    <>
      <section className="grid items-center gap-8 pb-8 pt-6 md:py-10 container mx-auto max-w-8xl py-12">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {t("title")}
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <div className="w-full">
          <SearchForm
            onSearch={(values) => handleSearch(values, 0)}
            isSearching={isSearching}
          />
        </div>
      </section>

      <section className="container mx-auto max-w-8xl py-12">
        {/* Initial State Message */}
        {!isSearching && searchResult === null && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <PartyPopper className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
              {t("findExperienceTitle")}
            </h3>
            <p className="text-muted-foreground">
              {t("findExperienceSubtitle")}
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
                  {t("pagination.previous")}
                </Button>
                <span className="text-sm font-medium">
                  {t("pagination.page", {
                    current: currentPage + 1,
                    total: pageInfo.totalPages,
                  })}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= pageInfo.totalPages - 1}
                  variant="outline"
                >
                  {t("pagination.next")}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isSearching && searchResult && (!events || events.length === 0) && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {t("noEventsTitle")}
            </h3>
            <p className="text-muted-foreground">{t("noEventsSubtitle")}</p>
          </div>
        )}
      </section>
    </>
  );
}
