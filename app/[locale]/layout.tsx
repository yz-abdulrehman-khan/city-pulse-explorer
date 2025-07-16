import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

const SUPPORTED_LOCALES = ["en", "ar"];

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;


  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  // Load messages for current locale
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
