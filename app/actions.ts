"use server";

import {
  searchEvents,
  getEventById,
  type TicketmasterResponse,
  type TicketmasterEvent,
} from "@/lib/ticketmaster";

export async function findEventsAction(
  keyword: string,
  city: string,
  page: number
): Promise<TicketmasterResponse> {
  const response = await searchEvents(keyword, city, page);
  return response;
}

export async function getEventsByIds(
  ids: string[]
): Promise<TicketmasterEvent[]> {
  if (!ids || ids.length === 0) {
    return [];
  }
  // Fetch all events in parallel
  const eventPromises = ids.map((id) => getEventById(id));
  const results = await Promise.all(eventPromises);
  // Filter out any null results (e.g., if an event was not found or removed)
  return results.filter((event): event is TicketmasterEvent => event !== null);
}
