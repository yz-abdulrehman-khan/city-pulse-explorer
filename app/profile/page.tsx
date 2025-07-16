"use client";

import { FavoriteEventsList } from "@/components/profile/favorite-events-list";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-5xl space-y-12 py-12">
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
