"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Job } from "@/data/jobs";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden group">
      <Link href={`/jobs/${job.id}`} className="block">
        <div className="p-4 md:p-6 transition-shadow duration-200 group-hover:shadow-[var(--shadow-card-hover)] group-active:scale-[0.98] cursor-pointer">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="format" size="sm">
                {job.format}
              </Badge>
              {job.urgent && <Badge variant="urgent">Срочно</Badge>}
            </div>
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
          </div>
          <h3 className="font-display text-lg md:text-xl xl:text-[22px] font-medium text-ink mb-1 break-words">
            {job.role}
          </h3>
          <p className="text-sm text-ink/60 mb-4">{job.company}</p>
          <div className="h-px bg-mist mb-4" />
          <div className="flex flex-wrap gap-4 text-sm text-ink/70 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {job.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Россия
            </span>
          </div>
          <div className="h-px bg-mist mb-4" />
          <div className="flex items-center justify-between">
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
