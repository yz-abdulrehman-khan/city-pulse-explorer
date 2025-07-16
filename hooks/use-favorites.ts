"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";

const USERS_KEY = "city-pulse-users";

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

  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }
    const users = getUsersFromStorage();
    setFavorites(users[currentUser]?.favorites || []);
  }, [currentUser]);

  const saveFavorites = (newFavorites: string[]) => {
    if (!currentUser) return;
    const users = getUsersFromStorage();
    users[currentUser] = users[currentUser] || { profile: {}, favorites: [] };
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
