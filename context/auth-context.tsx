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

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, rememberMe: boolean) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Mock a JWT token
const createMockToken = (email: string) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { email, iat: Date.now() };
  // In a real app, this would be signed on the server
  return `${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(payload))}`;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check both storages on initial load
    const storedToken =
      window.localStorage.getItem(AUTH_TOKEN_KEY) ||
      window.sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (email: string, rememberMe: boolean) => {
      const newToken = createMockToken(email);
      setToken(newToken);
      // Use localStorage for "Remember me", otherwise sessionStorage
      const storage = rememberMe ? window.localStorage : window.sessionStorage;
      storage.setItem(AUTH_TOKEN_KEY, newToken);
      router.push("/profile");
    },
    [router]
  );

  const logout = useCallback(() => {
    setToken(null);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/login");
  }, [router]);

  const value = {
    isAuthenticated: !!token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
