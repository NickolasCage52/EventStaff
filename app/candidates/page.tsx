import { CandidatesCatalog } from "@/components/catalog/CandidatesCatalog";
import { Container } from "@/components/layout/Container";
import { Suspense } from "react";

export const metadata = {
  title: "Кандидаты — EventStaff",
  description: "Каталог кандидатов для event-индустрии по всей России",
};

export default function CandidatesPage() {
  return (
    <div className="py-12 md:py-16 xl:py-20">
      <Container>
        <p className="mb-8 md:mb-12 text-ink/70 max-w-2xl text-sm md:text-base">
          Найдите персонал для ваших мероприятий
        </p>
        <Suspense fallback={<div className="animate-pulse h-64 bg-mist rounded-2xl" />}>
          <CandidatesCatalog />
        </Suspense>
      </Container>
    </div>
  );
}
