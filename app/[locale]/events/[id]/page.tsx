import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getEventById } from "@/lib/ticketmaster";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { FavoriteButton } from "@/components/events/favorite-button";
import { EventMapLoader } from "@/components/events/event-map-loader";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const t = await getTranslations("EventDetails");
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const venue = event._embedded?.venues[0];

  // Find the best available image
  const eventImage =
    event.images.find((image) => image.ratio === "16_9")?.url ||
    event.images.find((image) => image.ratio === "3_2")?.url ||
    event.images[0]?.url;

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Image Column */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          {eventImage ? (
            <Image
              src={eventImage || "/placeholder.svg"}
              alt={event.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <TicketIcon className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {event.name}
          </h1>

          <div className="flex flex-col space-y-4 text-lg text-muted-foreground">
            <div className="flex items-center">
              <CalendarIcon className="mr-3 h-5 w-5" />
              <span>
                {event.dates.start.localDate} at {event.dates.start.localTime}
              </span>
            </div>
            {venue && (
              <div className="flex items-center">
                <MapPinIcon className="mr-3 h-5 w-5" />
                <span>
                  {venue.name} - {venue.city.name}, {venue.address.line1}
                </span>
              </div>
            )}
          </div>

          {event.info && (
            <p className="text-base leading-relaxed">{event.info}</p>
          )}

          <div className="flex items-center space-x-4">
            <Button asChild size="lg" className="flex-grow">
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                {t("buyTickets")}
                <TicketIcon className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <FavoriteButton eventId={event.id} />
          </div>
        </div>
      </div>

      {/* Map Section */}
      {venue &&
        venue.location &&
        venue.location.latitude &&
        venue.location.longitude && (
          <div className="mt-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
              {t("venueLocation")}
            </h2>
            <div className="h-96 w-full">
              <EventMapLoader
                position={[
                  Number.parseFloat(venue.location.latitude),
                  Number.parseFloat(venue.location.longitude),
                ]}
                venueName={venue.name}
              />
            </div>
          </div>
        )}
    </div>
  );
}
