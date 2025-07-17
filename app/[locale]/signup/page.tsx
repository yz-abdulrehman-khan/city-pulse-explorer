"use client";

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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from "next-intl";

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
    defaultValues: { email: "", password: "", name: "", homeCity: "" },
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
    router.push("/");
  }

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>{t("emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
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
                  <FormItem className="grid gap-2">
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
                  <FormItem className="grid gap-2">
                    <FormLabel>{t("homeCityLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("homeCityPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t("signupButton")}
              </Button>
              {error && (
                <div className="text-red-600 text-center text-sm mt-1">
                  {error}
                </div>
              )}
            </form>
          </Form>
          <p className="text-center text-sm mt-4">
            {t("alreadyHaveAccount")}{" "}
            <a
              href="/login"
              className="underline text-primary hover:text-primary/80 font-medium"
            >
              {t("loginLink")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
