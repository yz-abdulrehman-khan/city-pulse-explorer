import { notFound } from "next/navigation";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getTranslations,
  setRequestLocale,
  getMessages,
} from "next-intl/server";
import { ReactNode } from "react";
import { GeistSans } from "geist/font/sans"; // or Inter if you prefer
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header"; // Or Navigation
import { AppProvider } from "@/components/layout/app-provider";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { FavoritesProvider } from "@/context/favoriate-context";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    // description: t("description"), // Uncomment if you have it
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Get locale from params
  const { locale } = await params;

  // Guard: only allow valid locales
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Set request-wide locale for SSR
  setRequestLocale(locale);

  // Get all translations/messages for current locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={GeistSans.className}
    >
      <body
        className="min-h-screen bg-background font-sans antialiased text-foreground
        flex flex-col
        selection:bg-primary/20
        transition-colors
        px-safe"
      >
        <AppProvider>
          <FavoritesProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />

              <main
                className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4
              mt-2"
              >
                {children}
              </main>
            </NextIntlClientProvider>
            <Toaster />
          </FavoritesProvider>
        </AppProvider>
      </body>
    </html>
  );
}
