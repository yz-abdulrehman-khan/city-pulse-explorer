"use client";

import type { MouseEvent } from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardFavoriteButtonProps {
  eventId: string;
}

export function EventCardFavoriteButton({
  eventId,
}: EventCardFavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = isFavorite(eventId);

  const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    // Prevent the click from bubbling up to the parent Link component
    e.preventDefault();
    e.stopPropagation();

    if (isFavorited) {
      removeFavorite(eventId);
    } else {
      addFavorite(eventId);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      aria-pressed={isFavorited}
      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/75 hover:text-white"
    >
      <Star
        className={cn(
          "h-5 w-5 transition-colors",
          isFavorited ? "fill-yellow-400 text-yellow-400" : "text-white"
        )}
      />
      <span className="sr-only">
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
}
