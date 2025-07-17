"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

interface FavoriteButtonProps {
  eventId: string;
}

export function FavoriteButton({ eventId }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = isFavorite(eventId);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(eventId);
    } else {
      addFavorite(eventId);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggleFavorite}
      aria-pressed={isFavorited}
      className="h-12 w-12 flex-shrink-0 bg-transparent"
    >
      <Star
        className={cn(
          "h-6 w-6 transition-colors",
          isFavorited
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        )}
      />
      <span className="sr-only">
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
}
