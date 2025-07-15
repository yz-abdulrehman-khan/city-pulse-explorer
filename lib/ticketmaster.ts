import axios from "axios";

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  images: { url: string }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  _embedded?: {
    venues: {
      name: string;
      city: { name: string };
      country: { name: string };
      address: { line1: string };
    }[];
  };
}

const ticketmasterApi = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/",
});

export async function searchEvents(
  keyword: string,
  city: string
): Promise<TicketmasterEvent[]> {
  try {
    const response = await ticketmasterApi.get("events.json", {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        keyword,
        city,
        size: 20, // Get up to 20 events
      },
    });

    // The events are nested in the _embedded property.
    // If it doesn't exist, there are no events, so we return an empty array.
    return response.data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching events from Ticketmaster:", error);
    // In case of an API error, we'll return an empty array
    // to prevent the app from crashing.
    return [];
  }
}
