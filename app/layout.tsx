import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AppProvider } from "@/components/layout/app-provider"; // Import the provider
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "City Pulse",
  description: "Your local events explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1 px-6 sm:px-8 md:px-10">{children}</main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
