"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

const FILL_COLOR = "#B8933A";
const EMPTY_COLOR = "#E8E5E0";

export function RatingStars({
  rating,
  count,
  size = "md",
  className,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="shrink-0"
            size={iconSize}
            style={{ fill: FILL_COLOR, color: FILL_COLOR }}
          />
        ))}
        {hasHalf && (
          <Star
            className="shrink-0"
            size={iconSize}
            style={{ fill: FILL_COLOR, color: FILL_COLOR, opacity: 0.7 }}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="shrink-0"
            size={iconSize}
            style={{ fill: EMPTY_COLOR, color: EMPTY_COLOR }}
          />
        ))}
      </div>
      {(rating > 0 || (count !== undefined && count > 0)) && (
        <span className="text-sm text-ink/80 ml-0.5">
          {rating > 0 && (
            <>
              {rating.toFixed(1)}
              {count !== undefined && count > 0 && ` (${count})`}
            </>
          )}
          {rating === 0 && count !== undefined && count > 0 && `(${count})`}
        </span>
      )}
    </div>
  );
}
