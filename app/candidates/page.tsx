import { CandidatesCatalog } from "@/components/catalog/CandidatesCatalog";
import { Suspense } from "react";

export const metadata = {
  title: "Кандидаты — EventStaff",
  description: "Каталог кандидатов для event-индустрии по всей России",
};

export default function CandidatesPage() {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-12 text-ink/70 max-w-2xl">
          Найдите персонал для ваших мероприятий
        </p>
        <Suspense fallback={<div className="animate-pulse h-64 bg-mist rounded-2xl" />}>
          <CandidatesCatalog />
        </Suspense>
      </div>
    </div>
  );
}
