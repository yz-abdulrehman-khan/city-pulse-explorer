"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "city-pulse-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on initial client-side render
  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error reading favorites from localStorage", error);
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      setFavorites(newFavorites);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback(
    (eventId: string) => {
      saveFavorites([...favorites, eventId]);
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    (eventId: string) => {
      saveFavorites(favorites.filter((id) => id !== eventId));
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (eventId: string) => favorites.includes(eventId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
