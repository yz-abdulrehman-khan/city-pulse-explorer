"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FavoriteEventsList } from "@/components/profile/favorite-events-list";
import { ProfileForm } from "@/components/profile/profile-form";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-12 py-12">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {t("myProfile")}
        </h2>
        <p className="text-muted-foreground">{t("updateDetails")}</p>
        <div className="mt-6">
          <ProfileForm />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {t("favoriteEvents")}
        </h2>
        <p className="text-muted-foreground">{t("savedEvents")}</p>
        <div className="mt-6">
          <FavoriteEventsList />
        </div>
      </div>
    </div>
  );
}
