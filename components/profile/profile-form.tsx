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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export function ProfileForm() {
  const t = useTranslations("ProfileForm");
  const { profile, saveProfile } = useProfile();
  const { toast } = useToast();

  const profileFormSchema = z.object({
    name: z.string().min(2, {
      message: t("nameValidation"),
    }),
    homeCity: z.string().min(2, {
      message: t("cityValidation"),
    }),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      homeCity: "",
    },
    values: profile,
  });

  function onSubmit(data: ProfileFormValues) {
    saveProfile(data);
    toast({
      title: t("updatedTitle"),
      description: t("updatedDescription"),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
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
                  <FormLabel>{t("homeCity")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("homeCityPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={!form.formState.isDirty}>
              {t("save")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
