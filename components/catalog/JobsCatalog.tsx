"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JobFilters } from "@/components/filters/JobFilters";
import { JobCard } from "@/components/ui/JobCard";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { jobs } from "@/data/jobs";
import { Search, SlidersHorizontal } from "lucide-react";
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

export function JobsCatalog() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "";

  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    initialRole ? [decodeURIComponent(initialRole)] : []
  );
  const [experience, setExperience] = useState<"any" | "1year" | "3years">("any");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const roleMatch =
        selectedRoles.length === 0 || selectedRoles.includes(job.category);
      const expMatch =
        experience === "any" ||
        (experience === "1year" && (job.experience === "1year" || job.experience === "3years")) ||
        (experience === "3years" && job.experience === "3years");
      return roleMatch && expMatch;
    });
  }, [selectedRoles, experience]);

  const hasActiveFilters = selectedRoles.length > 0 || experience !== "any";
  const activeCount = selectedRoles.length + (experience !== "any" ? 1 : 0);

  const resetFilters = () => {
    setSelectedRoles([]);
    setExperience("any");
  };

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach((j) => {
      counts[j.category] = (counts[j.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-12">
      {/* Mobile filters button */}
      <div className="xl:hidden">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 border border-mist rounded-xl px-4 py-3 min-h-[44px] w-full justify-center sm:w-auto sm:justify-start"
        >
          <SlidersHorizontal size={18} />
          Фильтры
          {activeCount > 0 && (
            <span className="bg-emerald text-white text-xs rounded-full px-2 py-0.5">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile/Tablet filters drawer */}
      <BottomSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Фильтры"
      >
        <div className="space-y-6">
          <div className="flex justify-end">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Сбросить
              </Button>
            )}
          </div>
          <JobFilters
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            experience={experience}
            setExperience={setExperience}
            roleCounts={roleCounts}
          />
          <Button
            variant="primary"
            className="w-full min-h-[44px]"
            onClick={() => setFiltersOpen(false)}
          >
            Показать вакансии
          </Button>
        </div>
      </BottomSheet>

      {/* Desktop sidebar (xl+) */}
      <aside className="hidden xl:block w-[280px] shrink-0 sticky top-[88px] self-start">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-ink">Фильтры</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Сбросить
            </Button>
          )}
        </div>
        <JobFilters
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          experience={experience}
          setExperience={setExperience}
          roleCounts={roleCounts}
        />
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="font-display text-2xl md:text-3xl font-medium text-ink">
            Вакансии
            <span className="ml-2 text-lg md:text-xl font-normal text-ink/60">
              {filteredJobs.length} вакансий
            </span>
          </h1>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 px-6 md:px-8 rounded-2xl bg-stone border border-mist">
            <Search className="h-12 w-12 text-ink/30 mb-4" />
            <h3 className="font-medium text-ink mb-2">
              По выбранным фильтрам вакансий не найдено
            </h3>
            <p className="text-sm text-ink/60 mb-6 text-center">
              Попробуйте изменить параметры поиска или сбросить фильтры
            </p>
            <Button variant="primary" onClick={resetFilters} className="min-h-[44px]">
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
