"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CandidateFilters } from "@/components/filters/CandidateFilters";
import { CandidateCard } from "@/components/ui/CandidateCard";
import { candidates } from "@/data/candidates";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ROLES = [
  "Официант",
  "Бармен",
  "Хостес",
  "Администратор",
  "Повар",
  "Координатор",
  "Кассир",
];

export function CandidatesCatalog() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "";

  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    initialRole ? [decodeURIComponent(initialRole)] : []
  );
  const [experience, setExperience] = useState<"any" | "1year" | "3years">("any");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const roleMatch =
        selectedRoles.length === 0 || selectedRoles.includes(c.category);
      const expMatch =
        experience === "any" ||
        (experience === "1year" &&
          (c.experienceLevel === "1year" || c.experienceLevel === "3years")) ||
        (experience === "3years" && c.experienceLevel === "3years");
      return roleMatch && expMatch;
    });
  }, [selectedRoles, experience]);

  const hasActiveFilters = selectedRoles.length > 0 || experience !== "any";

  const resetFilters = () => {
    setSelectedRoles([]);
    setExperience("any");
  };

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    candidates.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex gap-12">
      <aside className="w-[280px] shrink-0 sticky top-[88px] self-start">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-ink">Фильтры</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Сбросить
            </Button>
          )}
        </div>
        <CandidateFilters
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          experience={experience}
          setExperience={setExperience}
          roleCounts={roleCounts}
        />
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-medium text-ink">
            Кандидаты
            <span className="ml-2 text-xl font-normal text-ink/60">
              {filteredCandidates.length} анкет
            </span>
          </h1>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 rounded-2xl bg-stone border border-mist">
            <Search className="h-12 w-12 text-ink/30 mb-4" />
            <h3 className="font-medium text-ink mb-2">
              По выбранным фильтрам кандидатов не найдено
            </h3>
            <p className="text-sm text-ink/60 mb-6 text-center">
              Попробуйте изменить параметры поиска или сбросить фильтры
            </p>
            <Button variant="primary" onClick={resetFilters}>
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCandidates.map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
