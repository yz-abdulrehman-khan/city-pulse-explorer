"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { CITIES } from "@/lib/cities";
import { useTranslations } from "next-intl";

interface SearchFormProps {
  onSearch: (values: any) => void;
  isSearching: boolean;
}

export function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const t = useTranslations("SearchForm");

  const formSchema = z
    .object({
      keyword: z.string(),
      city: z.string(),
    })
    .refine((data) => data.keyword.length > 0 || data.city.length > 0, {
      message: t("validation"),
      path: ["keyword"],
    });

  type SearchFormValues = z.infer<typeof formSchema>;

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      city: "",
    },
  });

  const { isValid } = form.formState;
  const locationFetchedRef = useRef(false);

  const [query, setQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const filteredCities = !query
    ? CITIES
    : CITIES.filter((city) =>
        city.toLowerCase().includes((query ?? "").toLowerCase())
      );

  // Watch city value from form, never undefined
  useEffect(() => {
    setSelectedCity(form.watch("city") ?? "");
  }, [form.watch("city")]);

  // Sync combobox value with form value
  useEffect(() => {
    form.setValue("city", selectedCity ?? "");
  }, [selectedCity, form]);

  useEffect(() => {
    if (locationFetchedRef.current) return;
    locationFetchedRef.current = true;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          if (data.city) {
            form.setValue("city", data.city, { shouldValidate: true });
            setSelectedCity(data.city);
            setQuery(data.city);
            onSearch({ keyword: "", city: data.city });
          }
        } catch (error) {
          // Silent fail
        }
      },
      () => {}
    );
  }, [form, onSearch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)}>
        <div className="flex w-full flex-col rounded-lg bg-card p-3 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          {/* Keyword */}
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {t("whatLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("whatPlaceholder")}
                    className="rounded-none border-0 border-b border-input p-0 text-base transition-colors focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Separator orientation="vertical" className="hidden h-10 md:block" />

          {/* City with custom Combobox */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {t("whereLabel")}
                </FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-0 h-5 w-5 text-muted-foreground z-10" />
                    <Combobox
                      value={selectedCity ?? ""}
                      onChange={(city) => {
                        setSelectedCity(city ?? "");
                        setQuery(city ?? "");
                      }}
                    >
                      <div className="relative w-full">
                        <Combobox.Input
                          placeholder={t("wherePlaceholder")}
                          className={cn(
                            "rounded-none border-0 border-b border-input p-0 pl-7 text-base transition-colors bg-transparent w-full",
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 min-w-0 md:text-sm",
                            "focus:border-primary focus:outline-none focus:ring-0"
                          )}
                          displayValue={(city: string) => city}
                          onChange={(event) => {
                            setQuery(event.target.value ?? "");
                            setSelectedCity(event.target.value ?? "");
                          }}
                          value={selectedCity ?? ""}
                          autoComplete="off"
                          onBlur={field.onBlur}
                        />
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-card py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                          {filteredCities.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-muted-foreground">
                              {t("noCityFound")}
                            </div>
                          ) : (
                            filteredCities.map((city, idx) => (
                              <Combobox.Option
                                key={city + "_" + idx}
                                value={city}
                                className={({ active }) =>
                                  cn(
                                    "cursor-pointer select-none relative px-4 py-2",
                                    active
                                      ? "bg-accent text-accent-foreground"
                                      : "text-foreground"
                                  )
                                }
                              >
                                {city}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </div>
                    </Combobox>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 flex-shrink-0 cursor-pointer"
            disabled={!isValid || isSearching}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">{t("search")}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
