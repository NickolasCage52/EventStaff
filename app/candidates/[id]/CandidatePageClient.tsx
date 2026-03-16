"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CandidatePageClient() {
  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-mist p-4 z-30 safe-area-pb">
      <div className="flex gap-3 max-w-[1440px] mx-auto">
        <Button variant="primary" size="lg" className="flex-1 min-h-[44px] min-w-[44px]">
          Пригласить
        </Button>
        <Button variant="secondary" size="lg" className="flex-1 min-h-[44px] min-w-[44px]">
          Написать
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="min-h-[44px] min-w-[44px] p-0 shrink-0"
          aria-label="В избранное"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
