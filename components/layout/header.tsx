"use client";

import { Search, User, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";


export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6 sm:px-8 md:px-10">
        <Link href="/" className="flex items-center space-x-2">
          <Search className="h-6 w-6" />
          <span className="font-bold">City Pulse</span>
        </Link>
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <User className="mr-2 h-5 w-5" />
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
