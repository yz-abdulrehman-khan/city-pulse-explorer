import axios from "axios";

// Define a type for the event data we expect to receive.
// This helps with autocompletion and prevents bugs.
export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  info?: string; // Add the optional info/description field
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

// We'll also define a shape for the entire API response, including pagination info
export interface TicketmasterResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number; // This is the current page number (0-indexed)
  };
}

const ticketmasterApi = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/",
});

export async function searchEvents(
  keyword: string,
  city: string,
  page = 0
): Promise<TicketmasterResponse> {
  try {
    const response = await ticketmasterApi.get("events.json", {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        keyword,
        city,
        size: 20,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events from Ticketmaster:", error);
    // Return a default structure in case of an error
    return { page: { size: 0, totalElements: 0, totalPages: 0, number: 0 } };
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
    console.error(`Error fetching event with ID ${id}:`, error);
    return null;
  }
}
