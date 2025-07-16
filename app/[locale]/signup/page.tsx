"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { useAuth } from "@/hooks/use-auth";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  homeCity: z.string().min(2),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const t = useTranslations("Signup");
  const { signup } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      homeCity: "",
    },
  });

  function onSubmit(values: SignupFormValues) {
    setError(null);
    const ok = signup(
      values.email,
      values.password,
      { name: values.name, homeCity: values.homeCity },
      true
    );
    if (!ok) {
      setError(t("errorUserExists"));
      return;
    }
    router.push("/profile");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("emailPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("passwordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("passwordPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("nameLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("namePlaceholder")} {...field} />
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
                  <FormLabel>{t("homeCityLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("homeCityPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t("signupButton")}
            </Button>
            {error && (
              <div className="text-red-600 text-center text-sm mt-2">
                {error}
              </div>
            )}
          </form>
        </Form>
        <p className="text-sm text-center">
          {t("alreadyHaveAccount")}{" "}
          <a
            href="/login"
            className="underline text-primary hover:text-primary/80"
          >
            {t("loginLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
