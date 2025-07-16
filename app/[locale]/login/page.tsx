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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from "next-intl";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Login.formError" }),
  password: z.string().min(1, { message: "Login.formError" }),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const t = useTranslations("Login");
  const { login } = useAuth();
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: LoginFormValues) {
    setFormError(null);
    setIsLoading(true);
    // Authenticate
    const success = login(data.email, data.password, data.rememberMe || false);
    setIsLoading(false);
    if (!success) {
      setFormError(t("formError"));
      return;
    }
    // Otherwise, redirected to /profile by context
  }

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-balance text-muted-foreground">
              {t("subtitle")}
            </p>
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
                        autoComplete="username"
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
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="remember-me"
                      />
                    </FormControl>
                    <Label
                      htmlFor="remember-me"
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("rememberMe")}
                    </Label>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("loggingIn") : t("loginButton")}
              </Button>
              {formError && (
                <div className="text-red-600 text-center text-sm mt-1">
                  {formError}
                </div>
              )}
            </form>
          </Form>
          <p className="text-center text-sm mt-4">
            {t("noAccount")}{" "}
            <a
              href="/signup"
              className="underline text-primary hover:text-primary/80 font-medium"
            >
              {t("signupLink")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
