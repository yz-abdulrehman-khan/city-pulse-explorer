"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "@/hooks/use-auth";
import debounce from "lodash/debounce";

const USERS_KEY = "city-pulse-users";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (eventId: string) => void;
  removeFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Helpers to read/write users object (email => { ...user, favorites: [] })
function getUsersFromStorage(): Record<string, any> {
  try {
    const users = window.localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  } catch {
    return {};
  }
}

function saveUsersToStorage(users: Record<string, any>) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Silent fail to handle storage issues (e.g., quota exceeded)
  }
}

interface FavoritesProviderProps {
  children: ReactNode;
}

/**
 * Provider to manage favorites state in a context and persist to localStorage.
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load user's favorites when user changes
  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }
    const users = getUsersFromStorage();
    setFavorites(users[currentUser]?.favorites || []);
  }, [currentUser]);

  // Debounced function to persist favorites to localStorage
  const debouncedSaveFavorites = useCallback(
    debounce((user: string | null, newFavorites: string[]) => {
      if (!user) return;
      const users = getUsersFromStorage();
      users[user] = {
        ...users[user],
        favorites: newFavorites,
        email: user,
      };
      saveUsersToStorage(users);
    }, 300),
    []
  );

  // Persist favorites to localStorage when they change
  useEffect(() => {
    if (currentUser && favorites.length > 0) {
      debouncedSaveFavorites(currentUser, favorites);
    }
  }, [favorites, currentUser, debouncedSaveFavorites]);

  /**
   * Add an event ID to the favorites list.
   */
  const addFavorite = useCallback((eventId: string) => {
    setFavorites((prev) => {
      if (prev.includes(eventId)) return prev;
      return [...prev, eventId];
    });
  }, []);

  /**
   * Remove an event ID from the favorites list.
   */
  const removeFavorite = useCallback((eventId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== eventId));
  }, []);

  /**
   * Check if an event is in the user's favorites.
   */
  const isFavorite = useCallback(
    (eventId: string) => favorites.includes(eventId),
    [favorites]
  );

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
