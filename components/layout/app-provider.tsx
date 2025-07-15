"use client";

import { useState, useEffect, type ReactNode } from "react";
import { SplashScreen } from "./splash-screen";

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <SplashScreen /> : <>{children}</>;
}
