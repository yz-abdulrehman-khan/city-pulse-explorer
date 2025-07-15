import axios from "axios";

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  info?: string;
  images: {
      ratio: string; url: string 
}[];
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

export async function getEventById(
  id: string
): Promise<TicketmasterEvent | null> {
  try {
    const response = await ticketmasterApi.get(`events/${id}.json`, {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    // If the event is not found, Ticketmaster returns a 404, which axios will throw as an error.
    // We'll log the error for debugging but return null to the caller.
    console.error(`Error fetching event with ID ${id}:`, error);
    return null;
  }
}
