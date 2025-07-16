"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";

const USERS_KEY = "city-pulse-users";

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
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useFavorites() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load user's favorites when logged in/out or changed
  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }
    const users = getUsersFromStorage();
    setFavorites(users[currentUser]?.favorites || []);
  }, [currentUser]);

  // Save to both local state and persistent storage
  const saveFavorites = (newFavorites: string[]) => {
    if (!currentUser) return;
    const users = getUsersFromStorage();
    users[currentUser] = users[currentUser] || {
      favorites: [],
      profile: {},
      email: currentUser,
    };
    users[currentUser].favorites = newFavorites;
    saveUsersToStorage(users);
    setFavorites(newFavorites);
  };

  const addFavorite = useCallback(
    (eventId: string) => {
      if (!currentUser) return;
      if (favorites.includes(eventId)) return;
      saveFavorites([...favorites, eventId]);
    },
    [favorites, currentUser]
  );

  const removeFavorite = useCallback(
    (eventId: string) => {
      if (!currentUser) return;
      saveFavorites(favorites.filter((id) => id !== eventId));
    },
    [favorites, currentUser]
  );

  const isFavorite = useCallback(
    (eventId: string) => favorites.includes(eventId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
