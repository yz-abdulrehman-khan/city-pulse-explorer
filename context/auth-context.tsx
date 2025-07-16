"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const AUTH_TOKEN_KEY = "city-pulse-auth-token";
const USERS_KEY = "city-pulse-users";

// Context type
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: string | null;
  login: (email: string, password: string, rememberMe: boolean) => boolean;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    profile: { name: string; homeCity: string },
    rememberMe?: boolean
  ) => boolean;
}

// Helper to get users from storage (returns object keyed by email)
function getUsersFromStorage(): Record<string, any> {
  try {
    const users = window.localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  } catch {
    return {};
  }
}

// Helper to save users to storage
function setUsersToStorage(users: Record<string, any>) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Parse JWT to get email
function getEmailFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.email || null;
  } catch {
    return null;
  }
}

// Mock JWT
const createMockToken = (email: string) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { email, iat: Date.now() };
  return `${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(payload))}`;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken =
      window.localStorage.getItem(AUTH_TOKEN_KEY) ||
      window.sessionStorage.getItem(AUTH_TOKEN_KEY);
    setToken(storedToken);
    setCurrentUser(getEmailFromToken(storedToken));
    setIsLoading(false);
  }, []);

  // Login
  const login = useCallback(
    (email: string, password: string, rememberMe: boolean) => {
      const users = getUsersFromStorage();
      const user = users[email];
      if (!user || user.password !== password) {
        return false;
      }
      const newToken = createMockToken(email);
      setToken(newToken);
      setCurrentUser(email);
      const storage = rememberMe ? window.localStorage : window.sessionStorage;
      storage.setItem(AUTH_TOKEN_KEY, newToken);
      router.push("/profile");
      return true;
    },
    [router]
  );

  // Signup
  const signup = useCallback(
    (
      email: string,
      password: string,
      profile: { name: string; homeCity: string },
      rememberMe: boolean = true
    ) => {
      const users = getUsersFromStorage();
      if (users[email]) return false;
      users[email] = {
        email,
        password,
        name: profile.name,
        homeCity: profile.homeCity,
        favorites: [],
        profile,
      };
      setUsersToStorage(users);
      // Log in
      const newToken = createMockToken(email);
      setToken(newToken);
      setCurrentUser(email);
      const storage = rememberMe ? window.localStorage : window.sessionStorage;
      storage.setItem(AUTH_TOKEN_KEY, newToken);
      router.push("/");
      return true;
    },
    [router]
  );

  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/login");
  }, [router]);

  // Provide context
  const value: AuthContextType = {
    isAuthenticated: !!token,
    isLoading,
    currentUser,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
