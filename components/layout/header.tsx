"use client";

import { Ticket, User, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from "next-intl";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6 sm:px-8 md:px-10">
        <Link
          href="/"
          className="flex items-center text-primary hover:text-primary/80 transition-colors space-x-2"
        >
          <Ticket className="h-6 w-6" />
          <span className="font-bold">{t("brand")}</span>
        </Link>
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/"
                className="flex items-center text-primary hover:text-primary/80 transition-colors space-x-2"
              >
                <Home className="h-6 w-6" />
              </Link>
              <Link
                href="/profile"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <User className="mr-2 h-5 w-5" />
                {t("profile")}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <User className="mr-2 h-5 w-5" />
                {t("login")}
              </Link>
              <Link
                href="/signup"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <User className="mr-2 h-5 w-5" />
                {t("signup")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
