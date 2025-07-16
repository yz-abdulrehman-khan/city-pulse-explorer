"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  homeCity: z
    .string()
    .min(2, { message: "City must be at least 2 characters." }),
});

export function ProfileForm() {
  const { profile, saveProfile } = useProfile();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { name: "", homeCity: "" },
  });

  // When profile data loads from localStorage, update the form
  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, form]);

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    saveProfile(data);
    toast({
      title: "Profile Saved",
      description: "Your information has been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home City</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
