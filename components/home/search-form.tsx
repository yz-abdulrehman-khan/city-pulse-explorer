"use client";

import { useEffect, useRef } from "react";
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

const formSchema = z
  .object({
    keyword: z.string(),
    city: z.string(),
  })
  .refine((data) => data.keyword.length > 0 || data.city.length > 0, {
    message: "Please enter a keyword or a city.",
    path: ["keyword"],
  });

type SearchFormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
  onSearch: (values: SearchFormValues) => void;
  isSearching: boolean;
}

export function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      city: "",
    },
  });

  const { isValid } = form.formState;
  const locationFetchedRef = useRef(false);

  useEffect(() => {
    if (locationFetchedRef.current) return;

    locationFetchedRef.current = true; // Prevent this from running more than once
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
            // Automatically trigger search with the fetched city
            onSearch({ keyword: "", city: data.city });
          }
        } catch (error) {
          console.error("Error fetching city from location:", error);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, [form, onSearch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)}>
        <div className="flex w-full flex-col rounded-lg bg-card p-3 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  WHAT
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event, artist, or venue"
                    className="rounded-none border-0 border-b border-input p-0 text-base transition-colors focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator orientation="vertical" className="hidden h-10 md:block" />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  WHERE
                </FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-0 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="City, state, or zip code"
                      className="rounded-none border-0 border-b border-input p-0 pl-7 text-base transition-colors focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
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
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
