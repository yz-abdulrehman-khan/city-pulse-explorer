"use client";

import { useState, useEffect, useCallback } from "react";

const PROFILE_KEY = "city-pulse-profile";

export interface ProfileData {
  name: string;
  homeCity: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    homeCity: "",
  });

  // Load profile from localStorage on initial client-side render
  useEffect(() => {
    try {
      const storedProfile = window.localStorage.getItem(PROFILE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Error reading profile from localStorage", error);
    }
  }, []);

  const saveProfile = useCallback((newProfile: ProfileData) => {
    try {
      setProfile(newProfile);
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    } catch (error) {
      console.error("Error saving profile to localStorage", error);
    }
  }, []);

  return { profile, saveProfile };
}
