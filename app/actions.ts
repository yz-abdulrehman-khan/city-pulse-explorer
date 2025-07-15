"use server";

import { searchEvents, type TicketmasterEvent } from "@/lib/ticketmaster";

export async function findEventsAction(
  keyword: string,
  city: string
): Promise<TicketmasterEvent[]> {
  // Here you could add validation, logging, etc.
  const events = await searchEvents(keyword, city);
  return events;
}
