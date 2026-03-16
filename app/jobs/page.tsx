import { JobsCatalog } from "@/components/catalog/JobsCatalog";
import { Container } from "@/components/layout/Container";
import { Suspense } from "react";

export const metadata = {
  title: "Вакансии — EventStaff",
  description: "Каталог вакансий для event-персонала по всей России",
};

export default function JobsPage() {
  return (
    <div className="py-12 md:py-16 xl:py-20">
      <Container>
        <p className="mb-8 md:mb-12 text-ink/70 max-w-2xl text-sm md:text-base">
          Найдите персонал для мероприятий, банкетов и ресторанов
        </p>
        <Suspense fallback={<div className="animate-pulse h-64 bg-mist rounded-2xl" />}>
          <JobsCatalog />
        </Suspense>
      </Container>
    </div>
  );
}
