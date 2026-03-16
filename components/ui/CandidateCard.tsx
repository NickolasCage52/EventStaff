"use client";

import Link from "next/link";
import { ArrowRight, Heart, Check } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { Card } from "@/components/ui/Card";
import type { Candidate } from "@/data/candidates";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden group">
      <Link href={`/candidates/${candidate.id}`} className="block">
        <div className="flex md:flex-col gap-4 p-4 md:p-6 transition-shadow duration-200 group-hover:shadow-[var(--shadow-card-hover)] group-active:scale-[0.98] cursor-pointer">
          <Avatar
            name={candidate.name}
            size="lg"
            verified={candidate.verified}
            className="shrink-0 w-16 h-16 md:w-20 md:h-20"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-medium text-ink mb-0.5">
              {candidate.name}
            </h3>
            <p className="text-sm text-ink/60 mb-2">{candidate.role}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {candidate.verified && (
                <Badge variant="verified" size="sm" className="gap-1">
                  <Check className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {candidate.isTop && <Badge variant="top" size="sm">Топ</Badge>}
              {candidate.available && (
                <Badge variant="available" size="sm" className="gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Доступен
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-ink/70 mb-1">
              <span>Опыт: {candidate.experience} лет</span>
              <RatingStars
                rating={candidate.rating}
                count={candidate.reviewCount}
                size="sm"
              />
            </div>
            <p className="text-sm text-ink/60">{candidate.venueLevel}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className="p-2 rounded-full hover:bg-mist transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="В избранное"
            >
              <Heart
                className={cn("h-5 w-5 transition-colors", isFavorite && "fill-red-500 text-red-500")}
              />
            </button>
            <span className="text-sm text-emerald font-medium flex items-center gap-1">
              Смотреть
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
