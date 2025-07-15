"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TicketmasterEvent } from "@/lib/ticketmaster";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { EventCardFavoriteButton } from "./event-card-favorite-button";

export function EventCard({ event }: { event: TicketmasterEvent }) {
  const [imgError, setImgError] = useState(false);

  const venue = event._embedded?.venues[0];
  const eventImage = event.images.find((image) => image.ratio === "3_2")?.url;

  return (
    <Link href={`/events/${event.id}`} className="flex">
      <Card className="group flex w-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="relative p-0">
          <div className="relative h-48 w-full">
            {imgError || !eventImage ? (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <TicketIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            ) : (
              <Image
                src={eventImage || "/placeholder.svg"}
                alt={event.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <EventCardFavoriteButton eventId={event.id} />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2 line-clamp-2 text-lg group-hover:underline">
            {event.name}
          </CardTitle>
          {event.info && (
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {event.info}
            </p>
          )}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{event.dates.start.localDate}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex min-h-[20px] items-center space-x-2 text-sm text-muted-foreground">
            {venue && (
              <>
                <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">
                  {venue.name}, {venue.city.name}
                </span>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 h-6 w-3/4 rounded-md bg-muted" />
        <div className="mb-4 h-8 w-full rounded-md bg-muted" />
        <div className="h-4 w-1/2 rounded-md bg-muted" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-4 w-2/3 rounded-md bg-muted" />
      </CardFooter>
    </Card>
  );
}
