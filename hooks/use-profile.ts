"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";

const USERS_KEY = "city-pulse-users";

export interface ProfileData {
  name: string;
  homeCity: string;
}

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

export function useProfile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    homeCity: "",
  });

  useEffect(() => {
    if (!currentUser) {
      setProfile({ name: "", homeCity: "" });
      return;
    }
    const users = getUsersFromStorage();
    setProfile(users[currentUser]?.profile || { name: "", homeCity: "" });
  }, [currentUser]);

  const saveProfile = useCallback(
    (newProfile: ProfileData) => {
      if (!currentUser) return;
      const users = getUsersFromStorage();
      users[currentUser] = users[currentUser] || { profile: {}, favorites: [] };
      users[currentUser].profile = newProfile;
      saveUsersToStorage(users);
      setProfile(newProfile);
    },
    [currentUser]
  );

  return { profile, saveProfile };
}
