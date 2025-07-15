"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
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

const formSchema = z.object({
  keyword: z.string().min(1, { message: "error" }),
  city: z.string().min(1, { message: "error" }),
});

export function SearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      city: "",
    },
  });

  const { errors } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col rounded-lg border bg-card p-3 shadow-sm md:flex-row md:items-center md:space-x-2 md:space-y-0">
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
                    className={cn(
                      "rounded-none border-0 border-b border-transparent p-0 text-base transition-colors focus-visible:ring-0 focus-visible:ring-offset-0",
                      errors.keyword && "border-destructive"
                    )}
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
                  <Input
                    placeholder="City, state, or zip code"
                    className={cn(
                      "rounded-none border-0 border-b border-transparent p-0 text-base transition-colors focus-visible:ring-0 focus-visible:ring-offset-0",
                      errors.city && "border-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 flex-shrink-0 cursor-pointer"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
