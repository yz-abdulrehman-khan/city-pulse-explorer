"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Toggle between 'en' and 'ar'
  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    // Replace the locale segment in the path: /ar/... or /en/...
    const segments = pathname.split("/");
    if (segments[1] === "ar" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLocale} className="ml-2">
      {locale === "ar" ? "English" : "العربية"}
    </Button>
  );
}
