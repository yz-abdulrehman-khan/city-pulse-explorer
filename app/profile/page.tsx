"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { FavoriteEventsList } from "@/components/profile/favorite-events-list";
import { ProfileForm } from "@/components/profile/profile-form";
import { useAuth } from "@/hooks/use-auth";


export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // While loading or if not authenticated, render nothing to prevent flash of content
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-12 py-12">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          Update your personal details and manage your preferences.
        </p>
        <div className="mt-6">
          <ProfileForm />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Favorite Events
        </h2>
        <p className="text-muted-foreground">
          Here are the events you've saved for later.
        </p>
        <div className="mt-6">
          <FavoriteEventsList />
        </div>
      </div>
    </div>
  );
}
